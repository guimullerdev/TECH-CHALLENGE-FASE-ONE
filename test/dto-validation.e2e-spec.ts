/**
 * E2E — Validação de DTOs (Feature 33)
 *
 * Cobre todos os endpoints POST e PATCH dos 5 módulos com:
 *   (a) body vazio {}          → 400
 *   (b) tipo errado nos campos → 400
 *   (c) campos extras          → 400 (forbidNonWhitelisted)
 *
 * Pré-requisitos: mesmo banco de teste dos outros e2e specs.
 *   DATABASE_URL="postgresql://..." yarn test:e2e
 */

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { PrismaService } from 'src/prisma/prisma.service';

describe('DTO Validation — payloads inválidos (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let token: string;

    // IDs necessários para os testes de PATCH
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
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
        await app.init();

        prisma = moduleFixture.get<PrismaService>(PrismaService);

        // Limpa dados de teste anteriores
        await prisma.orderService.deleteMany();
        await prisma.orderPart.deleteMany();
        await prisma.serviceOrder.deleteMany();
        await prisma.vehicle.deleteMany();
        await prisma.customer.deleteMany();
        await prisma.service.deleteMany();
        await prisma.part.deleteMany();
        await prisma.user.deleteMany({ where: { email: 'validation@test.com' } });

        // Obtém token JWT para autenticar os requests
        const authRes = await request(app.getHttpServer())
            .post('/auth/register')
            .send({ email: 'validation@test.com', password: 'senha123' });
        token = authRes.body.accessToken;

        // Cria dados base para os testes de PATCH
        const customer = await request(app.getHttpServer())
            .post('/customers')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Cliente Validação', document: '11122233344', email: 'val@test.com', phone: '11900000001' });
        customerId = customer.body.id;

        const vehicle = await request(app.getHttpServer())
            .post('/vehicles')
            .set('Authorization', `Bearer ${token}`)
            .send({ plate: 'VAL0001', brand: 'Honda', model: 'Civic', year: 2019, customerId });
        vehicleId = vehicle.body.id;

        const service = await request(app.getHttpServer())
            .post('/services')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Revisão', price: 200, estimatedTime: 90 });
        serviceId = service.body.id;

        const part = await request(app.getHttpServer())
            .post('/parts')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Vela de ignição', price: 30, stockQty: 50 });
        partId = part.body.id;

        const order = await request(app.getHttpServer())
            .post('/service-orders')
            .set('Authorization', `Bearer ${token}`)
            .send({ customerId, vehicleId, description: 'OS para testes de validação' });
        orderId = order.body.id;
    });

    afterAll(async () => {
        await app.close();
    });

    // ── Helpers ───────────────────────────────────────────────────────────────

    function auth() {
        return { Authorization: `Bearer ${token}` };
    }

    function expectValidationError(res: request.Response) {
        expect(res.status).toBe(400);
        expect(Array.isArray(res.body.message) || typeof res.body.message === 'string').toBe(true);
    }

    // ══════════════════════════════════════════════════════════════════════════
    // CUSTOMERS
    // ══════════════════════════════════════════════════════════════════════════

    describe('POST /customers', () => {
        it('(a) body vazio → 400', async () => {
            const res = await request(app.getHttpServer())
                .post('/customers')
                .set(auth())
                .send({});
            expectValidationError(res);
        });

        it('(b) email inválido → 400', async () => {
            const res = await request(app.getHttpServer())
                .post('/customers')
                .set(auth())
                .send({ name: 'João', document: '123', email: 'nao-e-email', phone: '11999' });
            expectValidationError(res);
        });

        it('(c) campo extra → 400', async () => {
            const res = await request(app.getHttpServer())
                .post('/customers')
                .set(auth())
                .send({ name: 'João', document: '123', email: 'j@j.com', phone: '11999', extraField: 'hack' });
            expectValidationError(res);
        });
    });

    describe('PATCH /customers/:id', () => {
        it('(b) tipo errado (name como número) → 400', async () => {
            const res = await request(app.getHttpServer())
                .patch(`/customers/${customerId}`)
                .set(auth())
                .send({ name: 12345 });
            expectValidationError(res);
        });

        it('(c) campo extra → 400', async () => {
            const res = await request(app.getHttpServer())
                .patch(`/customers/${customerId}`)
                .set(auth())
                .send({ unknownField: 'x' });
            expectValidationError(res);
        });
    });

    // ══════════════════════════════════════════════════════════════════════════
    // VEHICLES
    // ══════════════════════════════════════════════════════════════════════════

    describe('POST /vehicles', () => {
        it('(a) body vazio → 400', async () => {
            const res = await request(app.getHttpServer())
                .post('/vehicles')
                .set(auth())
                .send({});
            expectValidationError(res);
        });

        it('(b) year como string → 400', async () => {
            const res = await request(app.getHttpServer())
                .post('/vehicles')
                .set(auth())
                .send({ plate: 'XXX0000', brand: 'Ford', model: 'Ka', year: 'dois mil', customerId });
            expectValidationError(res);
        });

        it('(c) campo extra → 400', async () => {
            const res = await request(app.getHttpServer())
                .post('/vehicles')
                .set(auth())
                .send({ plate: 'XXX0001', brand: 'Ford', model: 'Ka', year: 2020, customerId, cor: 'azul' });
            expectValidationError(res);
        });
    });

    describe('PATCH /vehicles/:id', () => {
        it('(b) year como string → 400', async () => {
            const res = await request(app.getHttpServer())
                .patch(`/vehicles/${vehicleId}`)
                .set(auth())
                .send({ year: 'dois mil e vinte' });
            expectValidationError(res);
        });

        it('(c) campo extra → 400', async () => {
            const res = await request(app.getHttpServer())
                .patch(`/vehicles/${vehicleId}`)
                .set(auth())
                .send({ cor: 'vermelho' });
            expectValidationError(res);
        });
    });

    // ══════════════════════════════════════════════════════════════════════════
    // SERVICES
    // ══════════════════════════════════════════════════════════════════════════

    describe('POST /services', () => {
        it('(a) body vazio → 400', async () => {
            const res = await request(app.getHttpServer())
                .post('/services')
                .set(auth())
                .send({});
            expectValidationError(res);
        });

        it('(b) price como string → 400', async () => {
            const res = await request(app.getHttpServer())
                .post('/services')
                .set(auth())
                .send({ name: 'Serviço', price: 'caro', estimatedTime: 30 });
            expectValidationError(res);
        });

        it('(c) campo extra → 400', async () => {
            const res = await request(app.getHttpServer())
                .post('/services')
                .set(auth())
                .send({ name: 'Serviço', price: 100, estimatedTime: 30, categoria: 'motor' });
            expectValidationError(res);
        });
    });

    describe('PATCH /services/:id', () => {
        it('(b) estimatedTime como string → 400', async () => {
            const res = await request(app.getHttpServer())
                .patch(`/services/${serviceId}`)
                .set(auth())
                .send({ estimatedTime: 'rápido' });
            expectValidationError(res);
        });

        it('(c) campo extra → 400', async () => {
            const res = await request(app.getHttpServer())
                .patch(`/services/${serviceId}`)
                .set(auth())
                .send({ categoria: 'eletrico' });
            expectValidationError(res);
        });
    });

    // ══════════════════════════════════════════════════════════════════════════
    // PARTS
    // ══════════════════════════════════════════════════════════════════════════

    describe('POST /parts', () => {
        it('(a) body vazio → 400', async () => {
            const res = await request(app.getHttpServer())
                .post('/parts')
                .set(auth())
                .send({});
            expectValidationError(res);
        });

        it('(b) stockQty como string → 400', async () => {
            const res = await request(app.getHttpServer())
                .post('/parts')
                .set(auth())
                .send({ name: 'Peça', price: 10, stockQty: 'muitas' });
            expectValidationError(res);
        });

        it('(c) campo extra → 400', async () => {
            const res = await request(app.getHttpServer())
                .post('/parts')
                .set(auth())
                .send({ name: 'Peça', price: 10, stockQty: 5, fornecedor: 'ACME' });
            expectValidationError(res);
        });
    });

    describe('PATCH /parts/:id', () => {
        it('(b) price como string → 400', async () => {
            const res = await request(app.getHttpServer())
                .patch(`/parts/${partId}`)
                .set(auth())
                .send({ price: 'barato' });
            expectValidationError(res);
        });

        it('(c) campo extra → 400', async () => {
            const res = await request(app.getHttpServer())
                .patch(`/parts/${partId}`)
                .set(auth())
                .send({ fornecedor: 'ACME' });
            expectValidationError(res);
        });
    });

    // ══════════════════════════════════════════════════════════════════════════
    // SERVICE ORDERS
    // ══════════════════════════════════════════════════════════════════════════

    describe('POST /service-orders', () => {
        it('(a) body vazio → 400', async () => {
            const res = await request(app.getHttpServer())
                .post('/service-orders')
                .set(auth())
                .send({});
            expectValidationError(res);
        });

        it('(b) customerId como string não-UUID → 400', async () => {
            const res = await request(app.getHttpServer())
                .post('/service-orders')
                .set(auth())
                .send({ customerId: 'nao-e-uuid', vehicleId, description: 'Teste' });
            expectValidationError(res);
        });

        it('(c) campo extra → 400', async () => {
            const res = await request(app.getHttpServer())
                .post('/service-orders')
                .set(auth())
                .send({ customerId, vehicleId, description: 'Teste', prioridade: 'alta' });
            expectValidationError(res);
        });
    });

    describe('PATCH /service-orders/:id', () => {
        it('(b) description como número → 400', async () => {
            const res = await request(app.getHttpServer())
                .patch(`/service-orders/${orderId}`)
                .set(auth())
                .send({ description: 99999 });
            expectValidationError(res);
        });

        it('(c) campo extra → 400', async () => {
            const res = await request(app.getHttpServer())
                .patch(`/service-orders/${orderId}`)
                .set(auth())
                .send({ prioridade: 'urgente' });
            expectValidationError(res);
        });
    });

    describe('POST /service-orders/:id/services', () => {
        it('(a) body vazio → 400', async () => {
            const res = await request(app.getHttpServer())
                .post(`/service-orders/${orderId}/services`)
                .set(auth())
                .send({});
            expectValidationError(res);
        });

        it('(b) serviceId como string não-UUID → 400', async () => {
            const res = await request(app.getHttpServer())
                .post(`/service-orders/${orderId}/services`)
                .set(auth())
                .send({ serviceId: 'nao-e-uuid' });
            expectValidationError(res);
        });

        it('(c) campo extra → 400', async () => {
            const res = await request(app.getHttpServer())
                .post(`/service-orders/${orderId}/services`)
                .set(auth())
                .send({ serviceId, desconto: 10 });
            expectValidationError(res);
        });
    });

    describe('POST /service-orders/:id/parts', () => {
        it('(a) body vazio → 400', async () => {
            const res = await request(app.getHttpServer())
                .post(`/service-orders/${orderId}/parts`)
                .set(auth())
                .send({});
            expectValidationError(res);
        });

        it('(b) quantity como string → 400', async () => {
            const res = await request(app.getHttpServer())
                .post(`/service-orders/${orderId}/parts`)
                .set(auth())
                .send({ partId, quantity: 'dois' });
            expectValidationError(res);
        });

        it('(c) campo extra → 400', async () => {
            const res = await request(app.getHttpServer())
                .post(`/service-orders/${orderId}/parts`)
                .set(auth())
                .send({ partId, quantity: 1, desconto: 5 });
            expectValidationError(res);
        });
    });
});
