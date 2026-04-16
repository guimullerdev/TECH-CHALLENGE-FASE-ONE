/**
 * E2E — Fluxo completo da Ordem de Serviço
 *
 * Pré-requisitos:
 *   1. PostgreSQL acessível com DATABASE_URL configurado (ex.: .env.test)
 *   2. `npx prisma migrate deploy` executado contra o banco de teste
 *
 * Execução:
 *   DATABASE_URL="postgresql://user:pass@localhost:5432/oficina_test" yarn test:e2e
 */

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

describe('Service Orders — full lifecycle (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    // IDs criados ao longo do teste
    let customerId: string;
    let vehicleId: string;
    let serviceId: string;
    let partId: string;
    let orderId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalFilters(new HttpExceptionFilter());
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
        await app.init();

        prisma = moduleFixture.get<PrismaService>(PrismaService);

        // Limpa o banco para garantir isolamento
        await prisma.orderService.deleteMany();
        await prisma.orderPart.deleteMany();
        await prisma.serviceOrder.deleteMany();
        await prisma.vehicle.deleteMany();
        await prisma.customer.deleteMany();
        await prisma.service.deleteMany();
        await prisma.part.deleteMany();
    });

    afterAll(async () => {
        await app.close();
    });

    // ── Step 1: Criar cliente ─────────────────────────────────────────────────

    it('1. POST /customers — cria cliente', async () => {
        const res = await request(app.getHttpServer())
            .post('/customers')
            .send({ name: 'Carlos E2E', document: '99988877766', email: 'carlos@e2e.com', phone: '11900000000' })
            .expect(201);

        customerId = res.body.id;
        expect(customerId).toBeDefined();
        expect(res.body.name).toBe('Carlos E2E');
    });

    // ── Step 2: Criar veículo ─────────────────────────────────────────────────

    it('2. POST /vehicles — cria veículo vinculado ao cliente', async () => {
        const res = await request(app.getHttpServer())
            .post('/vehicles')
            .send({ plate: 'E2E0001', brand: 'Fiat', model: 'Uno', year: 2015, customerId })
            .expect(201);

        vehicleId = res.body.id;
        expect(vehicleId).toBeDefined();
        expect(res.body.plate).toBe('E2E0001');
    });

    // ── Step 3: Criar serviço e peça ─────────────────────────────────────────

    it('3a. POST /services — cadastra serviço', async () => {
        const res = await request(app.getHttpServer())
            .post('/services')
            .send({ name: 'Alinhamento', price: 120, estimatedTime: 60 })
            .expect(201);

        serviceId = res.body.id;
        expect(serviceId).toBeDefined();
    });

    it('3b. POST /parts — cadastra peça com estoque', async () => {
        const res = await request(app.getHttpServer())
            .post('/parts')
            .send({ name: 'Pastilha de freio', price: 80, stockQty: 10 })
            .expect(201);

        partId = res.body.id;
        expect(partId).toBeDefined();
    });

    // ── Step 4: Abrir OS ──────────────────────────────────────────────────────

    it('4. POST /service-orders — abre OS com status RECEIVED', async () => {
        const res = await request(app.getHttpServer())
            .post('/service-orders')
            .send({ customerId, vehicleId, description: 'Barulho ao frear e desvio de direção' })
            .expect(201);

        orderId = res.body.id;
        expect(orderId).toBeDefined();
        expect(res.body.status).toBe('RECEIVED');
        expect(res.body.totalPrice).toBe(0);
    });

    // ── Step 5: Adicionar itens ───────────────────────────────────────────────

    it('5a. POST /service-orders/:id/services — adiciona serviço', async () => {
        const res = await request(app.getHttpServer())
            .post(`/service-orders/${orderId}/services`)
            .send({ serviceId })
            .expect(201);

        expect(res.body.totalPrice).toBe(120);
        expect(res.body.services).toHaveLength(1);
    });

    it('5b. POST /service-orders/:id/parts — adiciona peça (qty=2)', async () => {
        const res = await request(app.getHttpServer())
            .post(`/service-orders/${orderId}/parts`)
            .send({ partId, quantity: 2 })
            .expect(201);

        expect(res.body.order.totalPrice).toBe(280); // 120 + 80*2
        expect(res.body.order.parts).toHaveLength(1);
        expect(res.body.stockAvailable).toBe(true);
        expect(res.body.stockQty).toBe(10);
    });

    it('5c. GET /service-orders/:id — retorna OS com itens e totalPrice', async () => {
        const res = await request(app.getHttpServer())
            .get(`/service-orders/${orderId}`)
            .expect(200);

        expect(res.body.totalPrice).toBe(280);
        expect(res.body.services).toHaveLength(1);
        expect(res.body.parts).toHaveLength(1);
    });

    // ── Step 6: Ciclo de vida ─────────────────────────────────────────────────

    it('6a. POST /service-orders/:id/start-diagnosis — RECEIVED → DIAGNOSING', async () => {
        const res = await request(app.getHttpServer())
            .post(`/service-orders/${orderId}/start-diagnosis`)
            .expect(201);

        expect(res.body.status).toBe('DIAGNOSING');
    });

    it('6b. POST /service-orders/:id/start-diagnosis — 422 se status não é RECEIVED', async () => {
        await request(app.getHttpServer())
            .post(`/service-orders/${orderId}/start-diagnosis`)
            .expect(422);
    });

    it('6c. POST /service-orders/:id/finish-diagnosis — DIAGNOSING → WAITING_APPROVAL', async () => {
        const res = await request(app.getHttpServer())
            .post(`/service-orders/${orderId}/finish-diagnosis`)
            .expect(201);

        expect(res.body.status).toBe('WAITING_APPROVAL');
        expect(res.body.totalPrice).toBe(280);
    });

    it('6d. POST /service-orders/:id/send-budget — valida orçamento', async () => {
        const res = await request(app.getHttpServer())
            .post(`/service-orders/${orderId}/send-budget`)
            .expect(201);

        expect(res.body.status).toBe('WAITING_APPROVAL');
        expect(res.body.totalPrice).toBe(280);
    });

    it('6e. POST /service-orders/:id/approve-budget — WAITING_APPROVAL → IN_PROGRESS, reserva estoque', async () => {
        const res = await request(app.getHttpServer())
            .post(`/service-orders/${orderId}/approve-budget`)
            .expect(201);

        expect(res.body.status).toBe('IN_PROGRESS');

        // Verifica que o estoque foi reservado (stockQty decrementado)
        const part = await prisma.part.findUnique({ where: { id: partId } });
        expect(part!.stockQty).toBe(8); // 10 - 2
    });

    it('6f. POST /service-orders/:id/finish — IN_PROGRESS → FINISHED', async () => {
        const res = await request(app.getHttpServer())
            .post(`/service-orders/${orderId}/finish`)
            .expect(201);

        expect(res.body.status).toBe('FINISHED');
    });

    it('6g. POST /service-orders/:id/deliver — FINISHED → DELIVERED', async () => {
        const res = await request(app.getHttpServer())
            .post(`/service-orders/${orderId}/deliver`)
            .expect(201);

        expect(res.body.status).toBe('DELIVERED');
    });

    // ── Step 7: Filtros e 404 ─────────────────────────────────────────────────

    it('7a. GET /service-orders?status=DELIVERED — retorna a OS entregue', async () => {
        const res = await request(app.getHttpServer())
            .get('/service-orders?status=DELIVERED')
            .expect(200);

        expect(res.body.length).toBeGreaterThanOrEqual(1);
        expect(res.body.some((o: any) => o.id === orderId)).toBe(true);
    });

    it('7b. GET /service-orders/:id — 404 para ID inexistente', async () => {
        await request(app.getHttpServer())
            .get('/service-orders/00000000-0000-0000-0000-000000000000')
            .expect(404);
    });

    // ── Step 8: Rejeição de orçamento ────────────────────────────────────────

    it('8. reject-budget flow — WAITING_APPROVAL → RECEIVED', async () => {
        // Cria nova OS
        const createRes = await request(app.getHttpServer())
            .post('/service-orders')
            .send({ customerId, vehicleId, description: 'Nova OS para rejeição' })
            .expect(201);
        const newOrderId = createRes.body.id;

        await request(app.getHttpServer())
            .post(`/service-orders/${newOrderId}/services`)
            .send({ serviceId })
            .expect(201);

        await request(app.getHttpServer())
            .post(`/service-orders/${newOrderId}/start-diagnosis`)
            .expect(201);

        await request(app.getHttpServer())
            .post(`/service-orders/${newOrderId}/finish-diagnosis`)
            .expect(201);

        const rejected = await request(app.getHttpServer())
            .post(`/service-orders/${newOrderId}/reject-budget`)
            .expect(201);

        expect(rejected.body.status).toBe('RECEIVED');

        // Estoque não deve ter mudado
        const part = await prisma.part.findUnique({ where: { id: partId } });
        expect(part!.stockQty).toBe(8); // unchanged from previous reservation
    });
});
