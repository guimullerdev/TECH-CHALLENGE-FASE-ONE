/**
 * E2E — Validação de DTOs
 *
 * Cobre endpoints POST/PUT dos módulos com:
 *   (a) body vazio {}          → 400
 *   (b) tipo errado nos campos → 400
 *   (c) campos extras          → 400 (forbidNonWhitelisted)
 */

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { PrismaService } from 'src/prisma/prisma.service';

describe('DTO Validation (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let token: string;
    let clienteId: string;
    let veiculoId: string;
    let servicoId: string;
    let pecaId: string;
    let osId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalFilters(new HttpExceptionFilter());
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
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
        await prisma.user.deleteMany({ where: { email: 'validation@test.com' } });

        const authRes = await request(app.getHttpServer())
            .post('/auth/register')
            .send({ email: 'validation@test.com', password: 'senha123' });
        token = authRes.body.accessToken;

        // Base data for PATCH tests
        const cliente = await request(app.getHttpServer())
            .post('/clientes')
            .set('Authorization', `Bearer ${token}`)
            .send({ nome: 'Cliente Validação', cpf: '11122233344', email: 'val@test.com', telefone: '11900000001' });
        clienteId = cliente.body.id;

        const veiculo = await request(app.getHttpServer())
            .post('/veiculos')
            .set('Authorization', `Bearer ${token}`)
            .send({ placa: 'VAL0001', marca: 'Honda', modelo: 'Civic', ano: 2019, clienteId });
        veiculoId = veiculo.body.id;

        const servico = await request(app.getHttpServer())
            .post('/servicos')
            .set('Authorization', `Bearer ${token}`)
            .send({ nome: 'Revisão', precoBase: 200 });
        servicoId = servico.body.id;

        const peca = await request(app.getHttpServer())
            .post('/pecas')
            .set('Authorization', `Bearer ${token}`)
            .send({ nome: 'Vela de ignição', precoUnitario: 30, qtdTotal: 50 });
        pecaId = peca.body.id;

        const os = await request(app.getHttpServer())
            .post('/os')
            .set('Authorization', `Bearer ${token}`)
            .send({ clienteId, veiculoId, descricaoProblema: 'OS para testes de validação' });
        osId = os.body.id;
    });

    afterAll(async () => {
        await app.close();
    });

    function auth() {
        return { Authorization: `Bearer ${token}` };
    }

    function expectValidationError(res: request.Response) {
        expect(res.status).toBe(400);
    }

    // ── /clientes ─────────────────────────────────────────────────────────────

    describe('POST /clientes', () => {
        it('(a) body vazio → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post('/clientes').set(auth()).send({}));
        });

        it('(b) email inválido → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post('/clientes').set(auth())
                .send({ nome: 'João', cpf: '12345678901', email: 'nao-e-email' }));
        });

        it('(c) campo extra → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post('/clientes').set(auth())
                .send({ nome: 'João', cpf: '12345678901', extraField: 'hack' }));
        });
    });

    describe('PUT /clientes/:id', () => {
        it('(b) nome como número → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).put(`/clientes/${clienteId}`).set(auth())
                .send({ nome: 12345 }));
        });

        it('(c) campo extra → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).put(`/clientes/${clienteId}`).set(auth())
                .send({ unknownField: 'x' }));
        });
    });

    // ── /veiculos ─────────────────────────────────────────────────────────────

    describe('POST /veiculos', () => {
        it('(a) body vazio → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post('/veiculos').set(auth()).send({}));
        });

        it('(b) ano como string → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post('/veiculos').set(auth())
                .send({ placa: 'XXX0000', marca: 'Ford', modelo: 'Ka', ano: 'dois mil', clienteId }));
        });

        it('(c) campo extra → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post('/veiculos').set(auth())
                .send({ placa: 'XXX0001', marca: 'Ford', modelo: 'Ka', clienteId, extraField: true }));
        });
    });

    describe('PUT /veiculos/:id', () => {
        it('(b) ano como string → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).put(`/veiculos/${veiculoId}`).set(auth())
                .send({ ano: 'dois mil' }));
        });

        it('(c) campo extra → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).put(`/veiculos/${veiculoId}`).set(auth())
                .send({ combustivel: 'flex' }));
        });
    });

    // ── /servicos ─────────────────────────────────────────────────────────────

    describe('POST /servicos', () => {
        it('(a) body vazio → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post('/servicos').set(auth()).send({}));
        });

        it('(b) precoBase como string → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post('/servicos').set(auth())
                .send({ nome: 'Serviço', precoBase: 'caro' }));
        });

        it('(c) campo extra → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post('/servicos').set(auth())
                .send({ nome: 'Serviço', precoBase: 100, categoria: 'motor' }));
        });
    });

    describe('PUT /servicos/:id', () => {
        it('(b) precoBase como string → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).put(`/servicos/${servicoId}`).set(auth())
                .send({ precoBase: 'barato' }));
        });

        it('(c) campo extra → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).put(`/servicos/${servicoId}`).set(auth())
                .send({ categoria: 'eletrico' }));
        });
    });

    // ── /pecas ────────────────────────────────────────────────────────────────

    describe('POST /pecas', () => {
        it('(a) body vazio → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post('/pecas').set(auth()).send({}));
        });

        it('(b) qtdTotal como string → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post('/pecas').set(auth())
                .send({ nome: 'Peça', precoUnitario: 10, qtdTotal: 'muitas' }));
        });

        it('(c) campo extra → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post('/pecas').set(auth())
                .send({ nome: 'Peça', precoUnitario: 10, fornecedor: 'ACME' }));
        });
    });

    describe('PUT /pecas/:id', () => {
        it('(b) precoUnitario como string → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).put(`/pecas/${pecaId}`).set(auth())
                .send({ precoUnitario: 'barato' }));
        });

        it('(c) campo extra → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).put(`/pecas/${pecaId}`).set(auth())
                .send({ fornecedor: 'ACME' }));
        });
    });

    // ── /os ───────────────────────────────────────────────────────────────────

    describe('POST /os', () => {
        it('(a) body vazio → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post('/os').set(auth()).send({}));
        });

        it('(b) clienteId não é UUID → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post('/os').set(auth())
                .send({ clienteId: 'nao-uuid', veiculoId }));
        });

        it('(c) campo extra → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post('/os').set(auth())
                .send({ clienteId, veiculoId, prioridade: 'alta' }));
        });
    });

    describe('POST /os/:id/servicos', () => {
        it('(a) body vazio → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post(`/os/${osId}/servicos`).set(auth()).send({}));
        });

        it('(b) servicoId não é UUID → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post(`/os/${osId}/servicos`).set(auth())
                .send({ servicoId: 'nao-uuid' }));
        });

        it('(c) campo extra → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post(`/os/${osId}/servicos`).set(auth())
                .send({ servicoId, desconto: 10 }));
        });
    });

    describe('POST /os/:id/pecas', () => {
        it('(a) body vazio → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post(`/os/${osId}/pecas`).set(auth()).send({}));
        });

        it('(b) quantidade como string → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post(`/os/${osId}/pecas`).set(auth())
                .send({ pecaId, quantidade: 'dois' }));
        });

        it('(c) campo extra → 400', async () => {
            expectValidationError(await request(app.getHttpServer()).post(`/os/${osId}/pecas`).set(auth())
                .send({ pecaId, quantidade: 1, desconto: 5 }));
        });
    });
});
