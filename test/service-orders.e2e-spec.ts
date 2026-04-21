/**
 * E2E — Ciclo de vida completo da Ordem de Serviço
 *
 * Fluxo: criar cliente/veículo/serviço/peça → abrir OS → diagnóstico
 *        → orçamento → aprovar → executar → entregar
 */

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { PrismaService } from 'src/prisma/prisma.service';

describe('Ordem de Serviço — ciclo de vida completo (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let token: string;

    let clienteId: string;
    let veiculoId: string;
    let servicoId: string;
    let pecaId: string;
    let osId: string;
    let orcamentoId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalFilters(new HttpExceptionFilter());
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
        await app.init();

        prisma = moduleFixture.get<PrismaService>(PrismaService);

        // Cleanup
        await prisma.movimentacaoEstoque.deleteMany();
        await prisma.orcamento.deleteMany();
        await prisma.osItemServico.deleteMany();
        await prisma.osItemPeca.deleteMany();
        await prisma.ordemDeServico.deleteMany();
        await prisma.veiculo.deleteMany();
        await prisma.cliente.deleteMany();
        await prisma.servico.deleteMany();
        await prisma.peca.deleteMany();
        await prisma.user.deleteMany({ where: { email: 'e2e-os@test.com' } });

        const authRes = await request(app.getHttpServer())
            .post('/auth/register')
            .send({ email: 'e2e-os@test.com', password: 'senha123' });
        token = authRes.body.accessToken;
    });

    afterAll(async () => {
        await app.close();
    });

    function auth() {
        return { Authorization: `Bearer ${token}` };
    }

    // ── 1. Cadastros base ─────────────────────────────────────────────────────

    it('1a. POST /clientes → 201', async () => {
        const res = await request(app.getHttpServer())
            .post('/clientes')
            .set(auth())
            .send({ nome: 'Carlos E2E', cpf: '99988877766', email: 'carlos@e2e.com', telefone: '11900000000' })
            .expect(201);

        clienteId = res.body.id;
        expect(clienteId).toBeDefined();
        expect(res.body.nome).toBe('Carlos E2E');
        expect(res.body.ativo).toBe(true);
    });

    it('1b. POST /veiculos → 201', async () => {
        const res = await request(app.getHttpServer())
            .post('/veiculos')
            .set(auth())
            .send({ placa: 'E2E0001', marca: 'Fiat', modelo: 'Uno', ano: 2015, clienteId })
            .expect(201);

        veiculoId = res.body.id;
        expect(veiculoId).toBeDefined();
        expect(res.body.placa).toBe('E2E0001');
    });

    it('1c. POST /servicos → 201', async () => {
        const res = await request(app.getHttpServer())
            .post('/servicos')
            .set(auth())
            .send({ nome: 'Alinhamento', precoBase: 120 })
            .expect(201);

        servicoId = res.body.id;
        expect(servicoId).toBeDefined();
    });

    it('1d. POST /pecas com estoque → 201', async () => {
        const res = await request(app.getHttpServer())
            .post('/pecas')
            .set(auth())
            .send({ nome: 'Pastilha de freio', precoUnitario: 80, qtdTotal: 10 })
            .expect(201);

        pecaId = res.body.id;
        expect(pecaId).toBeDefined();
        expect(res.body.qtdTotal).toBe(10);
        expect(res.body.qtdDisponivel).toBe(10);
    });

    // ── 2. Estoque — entrada manual ───────────────────────────────────────────

    it('2. POST /estoque/entrada → registra entrada', async () => {
        const res = await request(app.getHttpServer())
            .post('/estoque/entrada')
            .set(auth())
            .send({ pecaId, quantidade: 5, observacao: 'Reposição inicial' })
            .expect(201);

        expect(res.body.tipo).toBe('ENTRADA');
        expect(res.body.quantidade).toBe(5);

        const peca = await prisma.peca.findUnique({ where: { id: pecaId } });
        expect(peca!.qtdTotal).toBe(15);
        expect(peca!.qtdDisponivel).toBe(15);
    });

    // ── 3. Abrir OS ───────────────────────────────────────────────────────────

    it('3. POST /os → abre OS com status RECEBIDA', async () => {
        const res = await request(app.getHttpServer())
            .post('/os')
            .set(auth())
            .send({ clienteId, veiculoId, descricaoProblema: 'Barulho ao frear' })
            .expect(201);

        osId = res.body.id;
        expect(osId).toBeDefined();
        expect(res.body.status).toBe('RECEBIDA');
        expect(res.body.numero).toBeDefined();
    });

    // ── 4. Adicionar itens à OS ───────────────────────────────────────────────

    it('4a. POST /os/:id/servicos → adiciona serviço', async () => {
        const res = await request(app.getHttpServer())
            .post(`/os/${osId}/servicos`)
            .set(auth())
            .send({ servicoId })
            .expect(201);

        expect(res.body.servicos).toHaveLength(1);
        expect(res.body.servicos[0].precoUnitario).toBe(120);
    });

    it('4b. POST /os/:id/pecas → adiciona peça e reserva estoque', async () => {
        const res = await request(app.getHttpServer())
            .post(`/os/${osId}/pecas`)
            .set(auth())
            .send({ pecaId, quantidade: 2 })
            .expect(201);

        expect(res.body.pecas).toHaveLength(1);
        expect(res.body.pecas[0].quantidade).toBe(2);

        // Estoque reservado
        const peca = await prisma.peca.findUnique({ where: { id: pecaId } });
        expect(peca!.qtdDisponivel).toBe(13); // 15 - 2
        expect(peca!.qtdReservada).toBe(2);
    });

    it('4c. GET /os/:id → retorna OS com itens', async () => {
        const res = await request(app.getHttpServer())
            .get(`/os/${osId}`)
            .set(auth())
            .expect(200);

        expect(res.body.servicos).toHaveLength(1);
        expect(res.body.pecas).toHaveLength(1);
    });

    // ── 5. Diagnóstico ────────────────────────────────────────────────────────

    it('5a. PATCH /os/:id/iniciar-diagnostico → RECEBIDA → EM_DIAGNOSTICO', async () => {
        const res = await request(app.getHttpServer())
            .patch(`/os/${osId}/iniciar-diagnostico`)
            .set(auth())
            .expect(200);

        expect(res.body.status).toBe('EM_DIAGNOSTICO');
    });

    it('5b. PATCH /os/:id/iniciar-diagnostico novamente → 422', async () => {
        await request(app.getHttpServer())
            .patch(`/os/${osId}/iniciar-diagnostico`)
            .set(auth())
            .expect(422);
    });

    it('5c. PATCH /os/:id/concluir-diagnostico → EM_DIAGNOSTICO → AGUARDANDO_APROVACAO + orçamento gerado', async () => {
        const res = await request(app.getHttpServer())
            .patch(`/os/${osId}/concluir-diagnostico`)
            .set(auth())
            .expect(200);

        expect(res.body.status).toBe('AGUARDANDO_APROVACAO');

        // Orçamento deve ter sido criado automaticamente
        const orc = await prisma.orcamento.findFirst({ where: { osId } });
        expect(orc).not.toBeNull();
        orcamentoId = orc!.id;
        expect(Number(orc!.valorTotal)).toBe(280); // 120 + 80*2
    });

    // ── 6. Orçamento ──────────────────────────────────────────────────────────

    it('6a. GET /orcamentos/:id → retorna orçamento', async () => {
        const res = await request(app.getHttpServer())
            .get(`/orcamentos/${orcamentoId}`)
            .set(auth())
            .expect(200);

        expect(res.body.status).toBe('GERADO');
        expect(res.body.valorTotal).toBe(280);
    });

    it('6b. POST /orcamentos/:id/enviar → GERADO → ENVIADO', async () => {
        const res = await request(app.getHttpServer())
            .post(`/orcamentos/${orcamentoId}/enviar`)
            .set(auth())
            .expect(201);

        expect(res.body.status).toBe('ENVIADO');
    });

    it('6c. PATCH /orcamentos/:id/aprovar → ENVIADO → APROVADO; OS → APROVADA', async () => {
        const res = await request(app.getHttpServer())
            .patch(`/orcamentos/${orcamentoId}/aprovar`)
            .set(auth())
            .expect(200);

        expect(res.body.status).toBe('APROVADO');

        const os = await prisma.ordemDeServico.findUnique({ where: { id: osId } });
        expect(os!.status).toBe('APROVADA');
    });

    // ── 7. Execução ───────────────────────────────────────────────────────────

    it('7a. PATCH /os/:id/iniciar-execucao → APROVADA → EM_EXECUCAO', async () => {
        const res = await request(app.getHttpServer())
            .patch(`/os/${osId}/iniciar-execucao`)
            .set(auth())
            .expect(200);

        expect(res.body.status).toBe('EM_EXECUCAO');
    });

    it('7b. PATCH /os/:id/pecas/:itemId/utilizar → marca peça como utilizada e baixa estoque', async () => {
        const os = await prisma.ordemDeServico.findUnique({
            where: { id: osId },
            include: { osItensPeca: true },
        });
        const itemId = os!.osItensPeca[0].id;

        await request(app.getHttpServer())
            .patch(`/os/${osId}/pecas/${itemId}/utilizar`)
            .set(auth())
            .expect(200);

        const peca = await prisma.peca.findUnique({ where: { id: pecaId } });
        expect(peca!.qtdReservada).toBe(0);
        expect(peca!.qtdTotal).toBe(13); // 15 - 2
    });

    it('7c. PATCH /os/:id/finalizar-execucao → EM_EXECUCAO → FINALIZADA', async () => {
        const res = await request(app.getHttpServer())
            .patch(`/os/${osId}/finalizar-execucao`)
            .set(auth())
            .expect(200);

        expect(res.body.status).toBe('FINALIZADA');
        expect(res.body.dataFechamento).toBeDefined();
    });

    it('7d. PATCH /os/:id/entregar → FINALIZADA → ENTREGUE', async () => {
        const res = await request(app.getHttpServer())
            .patch(`/os/${osId}/entregar`)
            .set(auth())
            .expect(200);

        expect(res.body.status).toBe('ENTREGUE');
    });

    // ── 8. Filtros e 404 ──────────────────────────────────────────────────────

    it('8a. GET /os?status=ENTREGUE → retorna a OS', async () => {
        const res = await request(app.getHttpServer())
            .get('/os?status=ENTREGUE')
            .set(auth())
            .expect(200);

        expect(res.body.some((o: any) => o.id === osId)).toBe(true);
    });

    it('8b. GET /os/:id com ID inexistente → 404', async () => {
        await request(app.getHttpServer())
            .get('/os/00000000-0000-0000-0000-000000000000')
            .set(auth())
            .expect(404);
    });

    // ── 9. Fluxo de reprovação ────────────────────────────────────────────────

    it('9. reprovar orçamento → OS → REPROVADA, estoque liberado', async () => {
        // Nova OS
        const osRes = await request(app.getHttpServer())
            .post('/os')
            .set(auth())
            .send({ clienteId, veiculoId })
            .expect(201);
        const novaOsId = osRes.body.id;

        await request(app.getHttpServer()).post(`/os/${novaOsId}/servicos`).set(auth()).send({ servicoId }).expect(201);
        await request(app.getHttpServer()).post(`/os/${novaOsId}/pecas`).set(auth()).send({ pecaId, quantidade: 1 }).expect(201);

        const pecaAntes = await prisma.peca.findUnique({ where: { id: pecaId } });
        const disponivelAntes = pecaAntes!.qtdDisponivel;

        await request(app.getHttpServer()).patch(`/os/${novaOsId}/iniciar-diagnostico`).set(auth()).expect(200);
        await request(app.getHttpServer()).patch(`/os/${novaOsId}/concluir-diagnostico`).set(auth()).expect(200);

        const orc = await prisma.orcamento.findFirst({ where: { osId: novaOsId } });
        const res = await request(app.getHttpServer())
            .patch(`/orcamentos/${orc!.id}/reprovar`)
            .set(auth())
            .send({ observacoes: 'Muito caro' })
            .expect(200);

        expect(res.body.status).toBe('REPROVADO');

        const os = await prisma.ordemDeServico.findUnique({ where: { id: novaOsId } });
        expect(os!.status).toBe('REPROVADA');

        // Reserva deve ter sido liberada
        const pecaDepois = await prisma.peca.findUnique({ where: { id: pecaId } });
        expect(pecaDepois!.qtdDisponivel).toBe(disponivelAntes + 1);
        expect(pecaDepois!.qtdReservada).toBe(0);
    });
});
