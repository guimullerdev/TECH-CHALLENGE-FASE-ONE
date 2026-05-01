import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { GerarOrcamentoUseCase } from './gerar-orcamento.usecase';
import { EnviarOrcamentoUseCase } from './enviar-orcamento.usecase';
import { AprovarOrcamentoUseCase } from './aprovar-orcamento.usecase';
import { ReprovarOrcamentoUseCase } from './reprovar-orcamento.usecase';
import { GetOrcamentoUseCase } from './get-orcamento.usecase';
import { Orcamento, StatusOrcamento } from '../../domain/entities/orcamento.entity';
import { OrdemDeServico, StatusOS, InvalidTransitionError } from '../../../service-orders/domain/entities/service-orders.entity';
import type { IOrcamentoRepository } from '../../domain/repositories/orcamento.repository.interface';
import type { IOrdemDeServicoRepository } from '../../../service-orders/domain/repositories/service-orders.repository.interface';
import type { LiberarReservaUseCase } from '../../../estoque/application/use-cases/liberar-reserva.usecase';

const mockOrcRepo = (): jest.Mocked<IOrcamentoRepository> => ({
    create: jest.fn(),
    findById: jest.fn(),
    findByOsId: jest.fn(),
    update: jest.fn(),
});

const mockOsRepo = (): jest.Mocked<IOrdemDeServicoRepository> => ({
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    generateNumero: jest.fn(),
});

const mockLiberarReserva = () => ({
    execute: jest.fn().mockResolvedValue({}),
}) as unknown as LiberarReservaUseCase;

const makeOrcamento = (status = StatusOrcamento.GERADO) =>
    Orcamento.restore({
        id: 'orc-1',
        osId: 'os-1',
        status,
        valorTotal: 500,
        dataGeracao: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    });

const makeOs = (status = StatusOS.AGUARDANDO_APROVACAO) =>
    OrdemDeServico.restore({
        id: 'os-1',
        numero: 'OS-001',
        clienteId: 'c-1',
        veiculoId: 'v-1',
        status,
        servicos: [],
        pecas: [],
        historicoStatus: [],
        dataAbertura: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    });

// ─── GerarOrcamentoUseCase ───────────────────────────────────────────────────
describe('GerarOrcamentoUseCase', () => {
    it('creates and returns orcamento', async () => {
        const repo = mockOrcRepo();
        repo.create.mockImplementation(async (o) => o);

        const useCase = new GerarOrcamentoUseCase(repo as any);
        const result = await useCase.execute('os-1', 500);

        expect(repo.create).toHaveBeenCalledTimes(1);
        expect(result.osId).toBe('os-1');
        expect(result.valorTotal).toBe(500);
        expect(result.status).toBe(StatusOrcamento.GERADO);
    });
});

// ─── EnviarOrcamentoUseCase ──────────────────────────────────────────────────
describe('EnviarOrcamentoUseCase', () => {
    it('sends orcamento (GERADO → ENVIADO)', async () => {
        const repo = mockOrcRepo();
        repo.findById.mockResolvedValue(makeOrcamento(StatusOrcamento.GERADO));
        repo.update.mockImplementation(async (o) => o);

        const useCase = new EnviarOrcamentoUseCase(repo as any);
        const result = await useCase.execute('orc-1');

        expect(result.status).toBe(StatusOrcamento.ENVIADO);
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockOrcRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new EnviarOrcamentoUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('throws UnprocessableEntityException for invalid transition', async () => {
        const repo = mockOrcRepo();
        repo.findById.mockResolvedValue(makeOrcamento(StatusOrcamento.APROVADO));

        const useCase = new EnviarOrcamentoUseCase(repo as any);
        await expect(useCase.execute('orc-1')).rejects.toThrow(UnprocessableEntityException);
    });

    it('rethrows unexpected errors from enviar', async () => {
        const repo = mockOrcRepo();
        const orc = makeOrcamento(StatusOrcamento.GERADO);
        jest.spyOn(orc, 'enviar').mockImplementation(() => { throw new Error('unexpected-enviar'); });
        repo.findById.mockResolvedValue(orc);

        const useCase = new EnviarOrcamentoUseCase(repo as any);
        await expect(useCase.execute('orc-1')).rejects.toThrow('unexpected-enviar');
    });
});

// ─── AprovarOrcamentoUseCase ─────────────────────────────────────────────────
describe('AprovarOrcamentoUseCase', () => {
    it('approves orcamento from ENVIADO', async () => {
        const orcRepo = mockOrcRepo();
        const osRepo = mockOsRepo();
        orcRepo.findById.mockResolvedValue(makeOrcamento(StatusOrcamento.ENVIADO));
        osRepo.findById.mockResolvedValue(makeOs(StatusOS.AGUARDANDO_APROVACAO));
        osRepo.update.mockImplementation(async (o) => o);
        orcRepo.update.mockImplementation(async (o) => o);

        const useCase = new AprovarOrcamentoUseCase(orcRepo as any, osRepo as any);
        const result = await useCase.execute('orc-1');

        expect(result.status).toBe(StatusOrcamento.APROVADO);
        expect(osRepo.update).toHaveBeenCalledTimes(1);
    });

    it('approves orcamento when OS not found (no OS update)', async () => {
        const orcRepo = mockOrcRepo();
        const osRepo = mockOsRepo();
        orcRepo.findById.mockResolvedValue(makeOrcamento(StatusOrcamento.ENVIADO));
        osRepo.findById.mockResolvedValue(null);
        orcRepo.update.mockImplementation(async (o) => o);

        const useCase = new AprovarOrcamentoUseCase(orcRepo as any, osRepo as any);
        const result = await useCase.execute('orc-1');

        expect(result.status).toBe(StatusOrcamento.APROVADO);
        expect(osRepo.update).not.toHaveBeenCalled();
    });

    it('throws NotFoundException if orcamento not found', async () => {
        const orcRepo = mockOrcRepo();
        const osRepo = mockOsRepo();
        orcRepo.findById.mockResolvedValue(null);

        const useCase = new AprovarOrcamentoUseCase(orcRepo as any, osRepo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('throws UnprocessableEntityException for invalid orcamento transition', async () => {
        const orcRepo = mockOrcRepo();
        const osRepo = mockOsRepo();
        orcRepo.findById.mockResolvedValue(makeOrcamento(StatusOrcamento.REPROVADO));

        const useCase = new AprovarOrcamentoUseCase(orcRepo as any, osRepo as any);
        await expect(useCase.execute('orc-1')).rejects.toThrow(UnprocessableEntityException);
    });

    it('rethrows unexpected errors from orcamento.aprovar', async () => {
        const orcRepo = mockOrcRepo();
        const osRepo = mockOsRepo();
        const orc = makeOrcamento(StatusOrcamento.ENVIADO);
        jest.spyOn(orc, 'aprovar').mockImplementation(() => { throw new Error('unexpected-aprovar'); });
        orcRepo.findById.mockResolvedValue(orc);

        const useCase = new AprovarOrcamentoUseCase(orcRepo as any, osRepo as any);
        await expect(useCase.execute('orc-1')).rejects.toThrow('unexpected-aprovar');
    });

    it('rethrows unexpected errors from os.aprovarOrcamento', async () => {
        const orcRepo = mockOrcRepo();
        const osRepo = mockOsRepo();
        orcRepo.findById.mockResolvedValue(makeOrcamento(StatusOrcamento.ENVIADO));
        orcRepo.update.mockImplementation(async (o) => o);
        const os = makeOs(StatusOS.AGUARDANDO_APROVACAO);
        jest.spyOn(os, 'aprovarOrcamento').mockImplementation(() => { throw new Error('unexpected-os-aprovar'); });
        osRepo.findById.mockResolvedValue(os);

        const useCase = new AprovarOrcamentoUseCase(orcRepo as any, osRepo as any);
        await expect(useCase.execute('orc-1')).rejects.toThrow('unexpected-os-aprovar');
    });

    it('throws UnprocessableEntityException when os.aprovarOrcamento throws InvalidTransitionError', async () => {
        const orcRepo = mockOrcRepo();
        const osRepo = mockOsRepo();
        orcRepo.findById.mockResolvedValue(makeOrcamento(StatusOrcamento.ENVIADO));
        orcRepo.update.mockImplementation(async (o) => o);
        const os = makeOs(StatusOS.AGUARDANDO_APROVACAO);
        jest.spyOn(os, 'aprovarOrcamento').mockImplementation(() => { throw new InvalidTransitionError('bad transition'); });
        osRepo.findById.mockResolvedValue(os);

        const useCase = new AprovarOrcamentoUseCase(orcRepo as any, osRepo as any);
        await expect(useCase.execute('orc-1')).rejects.toThrow(UnprocessableEntityException);
    });
});

// ─── ReprovarOrcamentoUseCase ────────────────────────────────────────────────
describe('ReprovarOrcamentoUseCase', () => {
    it('rejects orcamento from ENVIADO', async () => {
        const orcRepo = mockOrcRepo();
        const osRepo = mockOsRepo();
        const liberar = mockLiberarReserva();
        orcRepo.findById.mockResolvedValue(makeOrcamento(StatusOrcamento.ENVIADO));
        osRepo.findById.mockResolvedValue(makeOs(StatusOS.AGUARDANDO_APROVACAO));
        osRepo.update.mockImplementation(async (o) => o);
        orcRepo.update.mockImplementation(async (o) => o);

        const useCase = new ReprovarOrcamentoUseCase(orcRepo as any, osRepo as any, liberar);
        const result = await useCase.execute('orc-1');

        expect(result.status).toBe(StatusOrcamento.REPROVADO);
    });

    it('throws NotFoundException if orcamento not found', async () => {
        const orcRepo = mockOrcRepo();
        const osRepo = mockOsRepo();
        const liberar = mockLiberarReserva();
        orcRepo.findById.mockResolvedValue(null);

        const useCase = new ReprovarOrcamentoUseCase(orcRepo as any, osRepo as any, liberar);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('throws UnprocessableEntityException for invalid transition', async () => {
        const orcRepo = mockOrcRepo();
        const osRepo = mockOsRepo();
        const liberar = mockLiberarReserva();
        orcRepo.findById.mockResolvedValue(makeOrcamento(StatusOrcamento.APROVADO));

        const useCase = new ReprovarOrcamentoUseCase(orcRepo as any, osRepo as any, liberar);
        await expect(useCase.execute('orc-1')).rejects.toThrow(UnprocessableEntityException);
    });

    it('skips OS update when OS not found', async () => {
        const orcRepo = mockOrcRepo();
        const osRepo = mockOsRepo();
        const liberar = mockLiberarReserva();
        orcRepo.findById.mockResolvedValue(makeOrcamento(StatusOrcamento.ENVIADO));
        osRepo.findById.mockResolvedValue(null);
        orcRepo.update.mockImplementation(async (o) => o);

        const useCase = new ReprovarOrcamentoUseCase(orcRepo as any, osRepo as any, liberar);
        const result = await useCase.execute('orc-1');

        expect(result.status).toBe(StatusOrcamento.REPROVADO);
        expect(osRepo.update).not.toHaveBeenCalled();
    });

    it('liberates reserves for each peca when OS has pecas', async () => {
        const orcRepo = mockOrcRepo();
        const osRepo = mockOsRepo();
        const liberar = mockLiberarReserva();
        orcRepo.findById.mockResolvedValue(makeOrcamento(StatusOrcamento.ENVIADO));
        const os = makeOs(StatusOS.AGUARDANDO_APROVACAO);
        const osWithPecas = OrdemDeServico.restore({
            ...os.toPlain ? os.toPlain() : {},
            id: 'os-1', numero: 'OS-001', clienteId: 'c-1', veiculoId: 'v-1',
            status: StatusOS.AGUARDANDO_APROVACAO,
            servicos: [],
            pecas: [
                { id: 'item-p-1', pecaId: 'p-1', quantidade: 2, valorUnitario: 25, status: 'reservada' as const },
            ],
            historicoStatus: [],
            dataAbertura: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        osRepo.findById.mockResolvedValue(osWithPecas);
        osRepo.update.mockImplementation(async (o) => o);
        orcRepo.update.mockImplementation(async (o) => o);

        const useCase = new ReprovarOrcamentoUseCase(orcRepo as any, osRepo as any, liberar);
        await useCase.execute('orc-1');

        expect(liberar.execute).toHaveBeenCalledTimes(1);
    });

    it('rethrows unexpected errors from orcamento.reprovar', async () => {
        const orcRepo = mockOrcRepo();
        const osRepo = mockOsRepo();
        const liberar = mockLiberarReserva();
        const orc = makeOrcamento(StatusOrcamento.ENVIADO);
        jest.spyOn(orc, 'reprovar').mockImplementation(() => { throw new Error('unexpected-reprovar'); });
        orcRepo.findById.mockResolvedValue(orc);

        const useCase = new ReprovarOrcamentoUseCase(orcRepo as any, osRepo as any, liberar);
        await expect(useCase.execute('orc-1')).rejects.toThrow('unexpected-reprovar');
    });

    it('rethrows unexpected errors from os.reprovarOrcamento', async () => {
        const orcRepo = mockOrcRepo();
        const osRepo = mockOsRepo();
        const liberar = mockLiberarReserva();
        orcRepo.findById.mockResolvedValue(makeOrcamento(StatusOrcamento.ENVIADO));
        const os = makeOs(StatusOS.AGUARDANDO_APROVACAO);
        jest.spyOn(os, 'reprovarOrcamento').mockImplementation(() => { throw new Error('unexpected-os-reprovar'); });
        osRepo.findById.mockResolvedValue(os);

        const useCase = new ReprovarOrcamentoUseCase(orcRepo as any, osRepo as any, liberar);
        await expect(useCase.execute('orc-1')).rejects.toThrow('unexpected-os-reprovar');
    });

    it('throws UnprocessableEntityException when os.reprovarOrcamento throws InvalidTransitionError', async () => {
        const orcRepo = mockOrcRepo();
        const osRepo = mockOsRepo();
        const liberar = mockLiberarReserva();
        orcRepo.findById.mockResolvedValue(makeOrcamento(StatusOrcamento.ENVIADO));
        const os = makeOs(StatusOS.AGUARDANDO_APROVACAO);
        jest.spyOn(os, 'reprovarOrcamento').mockImplementation(() => { throw new InvalidTransitionError('bad transition'); });
        osRepo.findById.mockResolvedValue(os);

        const useCase = new ReprovarOrcamentoUseCase(orcRepo as any, osRepo as any, liberar);
        await expect(useCase.execute('orc-1')).rejects.toThrow(UnprocessableEntityException);
    });
});

// ─── GetOrcamentoUseCase ─────────────────────────────────────────────────────
describe('GetOrcamentoUseCase', () => {
    it('returns orcamento by id', async () => {
        const repo = mockOrcRepo();
        repo.findById.mockResolvedValue(makeOrcamento());

        const useCase = new GetOrcamentoUseCase(repo as any);
        const result = await useCase.execute('orc-1');
        expect(result.id).toBe('orc-1');
    });

    it('throws NotFoundException if not found by id', async () => {
        const repo = mockOrcRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new GetOrcamentoUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('returns orcamento by osId', async () => {
        const repo = mockOrcRepo();
        repo.findByOsId.mockResolvedValue(makeOrcamento());

        const useCase = new GetOrcamentoUseCase(repo as any);
        const result = await useCase.executeByOsId('os-1');
        expect(result.osId).toBe('os-1');
    });

    it('throws NotFoundException if not found by osId', async () => {
        const repo = mockOrcRepo();
        repo.findByOsId.mockResolvedValue(null);

        const useCase = new GetOrcamentoUseCase(repo as any);
        await expect(useCase.executeByOsId('missing')).rejects.toThrow(NotFoundException);
    });
});
