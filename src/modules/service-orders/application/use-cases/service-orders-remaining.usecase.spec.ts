import { ConflictException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { GetOrdemDeServicoUseCase } from './get-service-orders.usecase';
import { AddServicoToOsUseCase } from './add-service-to-order.usecase';
import { AddPecaToOsUseCase } from './add-part-to-order.usecase';
import { RemoveServicoFromOsUseCase } from './remove-service-from-order.usecase';
import { RemovePecaFromOsUseCase } from './remove-part-from-order.usecase';
import { StartDiagnosisUseCase } from './start-diagnosis.usecase';
import { FinishDiagnosisUseCase } from './finish-diagnosis.usecase';
import { FinishOrderUseCase } from './finish-order.usecase';
import { DeliverOrderUseCase } from './deliver-order.usecase';
import { IniciarExecucaoUseCase } from './iniciar-execucao.usecase';
import { RealizarServicoUseCase } from './realizar-servico.usecase';
import { UtilizarPecaUseCase } from './utilizar-peca.usecase';
import { LiberarVeiculoUseCase } from './liberar-veiculo.usecase';
import { SendBudgetUseCase } from './send-budget.usecase';
import { RejectBudgetUseCase } from './reject-budget.usecase';
import { UpdateOrdemDeServicoUseCase } from './update-service-orders.usecase';
import { DeleteOrdemDeServicoUseCase } from './delete-service-orders.usecase';
import { OrdemDeServico, StatusOS } from '../../domain/entities/service-orders.entity';
import { Servico } from '../../../services/domain/entities/services.entity';
import { Peca } from '../../../parts/domain/entities/parts.entity';
import type { IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import type { IServicoRepository } from '../../../services/domain/repositories/services.repository';
import type { IPecaRepository } from '../../../parts/domain/repositories/parts.repository.interface';
import type { ReservarEstoqueUseCase } from '../../../estoque/application/use-cases/reservar-estoque.usecase';
import type { LiberarReservaUseCase } from '../../../estoque/application/use-cases/liberar-reserva.usecase';
import type { BaixaEstoqueUseCase } from '../../../estoque/application/use-cases/baixa-estoque.usecase';
import type { GerarOrcamentoUseCase } from '../../../orcamentos/application/use-cases/gerar-orcamento.usecase';

const mockOsRepo = (): jest.Mocked<IOrdemDeServicoRepository> => ({
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    generateNumero: jest.fn(),
});

const mockServicoRepo = (): jest.Mocked<IServicoRepository> => ({
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
});

const mockPecaRepo = (): jest.Mocked<IPecaRepository> => ({
    findById: jest.fn(),
    findByCodigo: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
});

const makeOs = (status = StatusOS.RECEBIDA, extra: Partial<Parameters<typeof OrdemDeServico.restore>[0]> = {}) =>
    OrdemDeServico.restore({
        id: 'os-1',
        numero: 'OS-001',
        clienteId: 'c-1',
        veiculoId: 'v-1',
        status,
        servicos: [],
        pecas: [],
        dataAbertura: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...extra,
    });

const makeServico = () =>
    Servico.restore({ id: 's-1', nome: 'Troca de óleo', precoBase: 80, ativo: true, createdAt: new Date(), updatedAt: new Date() });

const makePeca = () =>
    Peca.restore({ id: 'p-1', nome: 'Filtro', precoUnitario: 25, qtdTotal: 10, qtdDisponivel: 10, qtdReservada: 0, ativo: true, createdAt: new Date(), updatedAt: new Date() });

// ─── GetOrdemDeServicoUseCase ────────────────────────────────────────────────
describe('GetOrdemDeServicoUseCase', () => {
    it('returns OS by id', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(makeOs());

        const useCase = new GetOrdemDeServicoUseCase(repo as any);
        const result = await useCase.execute('os-1');
        expect(result.id).toBe('os-1');
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new GetOrdemDeServicoUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('executeAll returns list', async () => {
        const repo = mockOsRepo();
        repo.findAll.mockResolvedValue([makeOs()]);

        const useCase = new GetOrdemDeServicoUseCase(repo as any);
        const result = await useCase.executeAll();
        expect(result).toHaveLength(1);
    });
});

// ─── AddServicoToOsUseCase ───────────────────────────────────────────────────
describe('AddServicoToOsUseCase', () => {
    it('adds servico to OS', async () => {
        const osRepo = mockOsRepo();
        const servicoRepo = mockServicoRepo();
        osRepo.findById.mockResolvedValue(makeOs());
        servicoRepo.findById.mockResolvedValue(makeServico());
        osRepo.update.mockImplementation(async (o) => o);

        const useCase = new AddServicoToOsUseCase(osRepo as any, servicoRepo as any);
        const result = await useCase.execute('os-1', 's-1');

        expect(osRepo.update).toHaveBeenCalledTimes(1);
        expect(result.servicos).toHaveLength(1);
    });

    it('throws NotFoundException if OS not found', async () => {
        const osRepo = mockOsRepo();
        const servicoRepo = mockServicoRepo();
        osRepo.findById.mockResolvedValue(null);

        const useCase = new AddServicoToOsUseCase(osRepo as any, servicoRepo as any);
        await expect(useCase.execute('missing', 's-1')).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException if servico not found', async () => {
        const osRepo = mockOsRepo();
        const servicoRepo = mockServicoRepo();
        osRepo.findById.mockResolvedValue(makeOs());
        servicoRepo.findById.mockResolvedValue(null);

        const useCase = new AddServicoToOsUseCase(osRepo as any, servicoRepo as any);
        await expect(useCase.execute('os-1', 'missing')).rejects.toThrow(NotFoundException);
    });

    it('throws ConflictException if servico already in OS', async () => {
        const osRepo = mockOsRepo();
        const servicoRepo = mockServicoRepo();
        const os = makeOs(StatusOS.RECEBIDA, {
            servicos: [{ id: 'item-1', servicoId: 's-1', precoUnitario: 80 }],
        });
        osRepo.findById.mockResolvedValue(os);
        servicoRepo.findById.mockResolvedValue(makeServico());

        const useCase = new AddServicoToOsUseCase(osRepo as any, servicoRepo as any);
        await expect(useCase.execute('os-1', 's-1')).rejects.toThrow(ConflictException);
    });
});

// ─── AddPecaToOsUseCase ──────────────────────────────────────────────────────
describe('AddPecaToOsUseCase', () => {
    it('adds peca to OS and reserves stock', async () => {
        const osRepo = mockOsRepo();
        const pecaRepo = mockPecaRepo();
        const reservar = { execute: jest.fn().mockResolvedValue({}) } as unknown as ReservarEstoqueUseCase;
        osRepo.findById.mockResolvedValue(makeOs());
        pecaRepo.findById.mockResolvedValue(makePeca());
        osRepo.update.mockImplementation(async (o) => o);

        const useCase = new AddPecaToOsUseCase(osRepo as any, pecaRepo as any, reservar);
        const result = await useCase.execute('os-1', 'p-1', 2);

        expect(reservar.execute).toHaveBeenCalledTimes(1);
        expect(result.pecas).toHaveLength(1);
    });

    it('throws NotFoundException if OS not found', async () => {
        const osRepo = mockOsRepo();
        const pecaRepo = mockPecaRepo();
        const reservar = { execute: jest.fn() } as unknown as ReservarEstoqueUseCase;
        osRepo.findById.mockResolvedValue(null);

        const useCase = new AddPecaToOsUseCase(osRepo as any, pecaRepo as any, reservar);
        await expect(useCase.execute('missing', 'p-1', 1)).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException if peca not found', async () => {
        const osRepo = mockOsRepo();
        const pecaRepo = mockPecaRepo();
        const reservar = { execute: jest.fn() } as unknown as ReservarEstoqueUseCase;
        osRepo.findById.mockResolvedValue(makeOs());
        pecaRepo.findById.mockResolvedValue(null);

        const useCase = new AddPecaToOsUseCase(osRepo as any, pecaRepo as any, reservar);
        await expect(useCase.execute('os-1', 'missing', 1)).rejects.toThrow(NotFoundException);
    });
});

// ─── RemoveServicoFromOsUseCase ──────────────────────────────────────────────
describe('RemoveServicoFromOsUseCase', () => {
    it('removes servico from OS', async () => {
        const osRepo = mockOsRepo();
        const os = makeOs(StatusOS.RECEBIDA, {
            servicos: [{ id: 'item-1', servicoId: 's-1', precoUnitario: 80 }],
        });
        osRepo.findById.mockResolvedValue(os);
        osRepo.update.mockImplementation(async (o) => o);

        const useCase = new RemoveServicoFromOsUseCase(osRepo as any);
        const result = await useCase.execute('os-1', 's-1');

        expect(result.servicos).toHaveLength(0);
    });

    it('throws NotFoundException if OS not found', async () => {
        const osRepo = mockOsRepo();
        osRepo.findById.mockResolvedValue(null);

        const useCase = new RemoveServicoFromOsUseCase(osRepo as any);
        await expect(useCase.execute('missing', 's-1')).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException if servico not in OS', async () => {
        const osRepo = mockOsRepo();
        osRepo.findById.mockResolvedValue(makeOs());

        const useCase = new RemoveServicoFromOsUseCase(osRepo as any);
        await expect(useCase.execute('os-1', 'not-there')).rejects.toThrow(NotFoundException);
    });
});

// ─── RemovePecaFromOsUseCase ─────────────────────────────────────────────────
describe('RemovePecaFromOsUseCase', () => {
    it('removes peca from OS and releases reservation', async () => {
        const osRepo = mockOsRepo();
        const liberar = { execute: jest.fn().mockResolvedValue({}) } as unknown as LiberarReservaUseCase;
        const os = makeOs(StatusOS.RECEBIDA, {
            pecas: [{ id: 'item-1', pecaId: 'p-1', quantidade: 2, precoUnitario: 25, utilizada: false }],
        });
        osRepo.findById.mockResolvedValue(os);
        osRepo.update.mockImplementation(async (o) => o);

        const useCase = new RemovePecaFromOsUseCase(osRepo as any, liberar);
        const result = await useCase.execute('os-1', 'p-1');

        expect(liberar.execute).toHaveBeenCalledTimes(1);
        expect(result.pecas).toHaveLength(0);
    });

    it('throws NotFoundException if OS not found', async () => {
        const osRepo = mockOsRepo();
        const liberar = { execute: jest.fn() } as unknown as LiberarReservaUseCase;
        osRepo.findById.mockResolvedValue(null);

        const useCase = new RemovePecaFromOsUseCase(osRepo as any, liberar);
        await expect(useCase.execute('missing', 'p-1')).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException if peca not in OS', async () => {
        const osRepo = mockOsRepo();
        const liberar = { execute: jest.fn() } as unknown as LiberarReservaUseCase;
        osRepo.findById.mockResolvedValue(makeOs());

        const useCase = new RemovePecaFromOsUseCase(osRepo as any, liberar);
        await expect(useCase.execute('os-1', 'not-there')).rejects.toThrow(NotFoundException);
    });
});

// ─── StartDiagnosisUseCase ───────────────────────────────────────────────────
describe('StartDiagnosisUseCase', () => {
    it('transitions OS to EM_DIAGNOSTICO', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(makeOs(StatusOS.RECEBIDA));
        repo.update.mockImplementation(async (o) => o);

        const useCase = new StartDiagnosisUseCase(repo as any);
        const result = await useCase.execute('os-1');
        expect(result.status).toBe(StatusOS.EM_DIAGNOSTICO);
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new StartDiagnosisUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('throws UnprocessableEntityException for invalid transition', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(makeOs(StatusOS.EM_EXECUCAO));

        const useCase = new StartDiagnosisUseCase(repo as any);
        await expect(useCase.execute('os-1')).rejects.toThrow(UnprocessableEntityException);
    });
});

// ─── FinishDiagnosisUseCase ──────────────────────────────────────────────────
describe('FinishDiagnosisUseCase', () => {
    it('transitions OS to AGUARDANDO_APROVACAO and creates orcamento', async () => {
        const repo = mockOsRepo();
        const gerarOrcamento = { execute: jest.fn().mockResolvedValue({}) } as unknown as GerarOrcamentoUseCase;
        const updated = makeOs(StatusOS.AGUARDANDO_APROVACAO);
        repo.findById.mockResolvedValue(makeOs(StatusOS.EM_DIAGNOSTICO));
        repo.update.mockResolvedValue(updated);

        const useCase = new FinishDiagnosisUseCase(repo as any, gerarOrcamento);
        const result = await useCase.execute('os-1');

        expect(gerarOrcamento.execute).toHaveBeenCalledTimes(1);
        expect(result.status).toBe(StatusOS.AGUARDANDO_APROVACAO);
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockOsRepo();
        const gerarOrcamento = { execute: jest.fn() } as unknown as GerarOrcamentoUseCase;
        repo.findById.mockResolvedValue(null);

        const useCase = new FinishDiagnosisUseCase(repo as any, gerarOrcamento);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('throws UnprocessableEntityException for invalid transition', async () => {
        const repo = mockOsRepo();
        const gerarOrcamento = { execute: jest.fn() } as unknown as GerarOrcamentoUseCase;
        repo.findById.mockResolvedValue(makeOs(StatusOS.RECEBIDA));

        const useCase = new FinishDiagnosisUseCase(repo as any, gerarOrcamento);
        await expect(useCase.execute('os-1')).rejects.toThrow(UnprocessableEntityException);
    });
});

// ─── IniciarExecucaoUseCase ──────────────────────────────────────────────────
describe('IniciarExecucaoUseCase', () => {
    it('transitions OS to EM_EXECUCAO', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(makeOs(StatusOS.APROVADA));
        repo.update.mockImplementation(async (o) => o);

        const useCase = new IniciarExecucaoUseCase(repo as any);
        const result = await useCase.execute('os-1');
        expect(result.status).toBe(StatusOS.EM_EXECUCAO);
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new IniciarExecucaoUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('throws UnprocessableEntityException for invalid transition', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(makeOs(StatusOS.RECEBIDA));

        const useCase = new IniciarExecucaoUseCase(repo as any);
        await expect(useCase.execute('os-1')).rejects.toThrow(UnprocessableEntityException);
    });
});

// ─── FinishOrderUseCase ──────────────────────────────────────────────────────
describe('FinishOrderUseCase', () => {
    it('transitions OS to FINALIZADA', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(makeOs(StatusOS.EM_EXECUCAO));
        repo.update.mockImplementation(async (o) => o);

        const useCase = new FinishOrderUseCase(repo as any);
        const result = await useCase.execute('os-1');
        expect(result.status).toBe(StatusOS.FINALIZADA);
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new FinishOrderUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('throws UnprocessableEntityException for invalid transition', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(makeOs(StatusOS.RECEBIDA));

        const useCase = new FinishOrderUseCase(repo as any);
        await expect(useCase.execute('os-1')).rejects.toThrow(UnprocessableEntityException);
    });
});

// ─── DeliverOrderUseCase ─────────────────────────────────────────────────────
describe('DeliverOrderUseCase', () => {
    it('transitions OS to ENTREGUE', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(makeOs(StatusOS.FINALIZADA));
        repo.update.mockImplementation(async (o) => o);

        const useCase = new DeliverOrderUseCase(repo as any);
        const result = await useCase.execute('os-1');
        expect(result.status).toBe(StatusOS.ENTREGUE);
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new DeliverOrderUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('throws UnprocessableEntityException for invalid transition', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(makeOs(StatusOS.RECEBIDA));

        const useCase = new DeliverOrderUseCase(repo as any);
        await expect(useCase.execute('os-1')).rejects.toThrow(UnprocessableEntityException);
    });
});

// ─── RealizarServicoUseCase ──────────────────────────────────────────────────
describe('RealizarServicoUseCase', () => {
    it('registers execution of a service item', async () => {
        const repo = mockOsRepo();
        const os = makeOs(StatusOS.EM_EXECUCAO, {
            servicos: [{ id: 'item-s-1', servicoId: 's-1', precoUnitario: 80 }],
        });
        repo.findById.mockResolvedValue(os);
        repo.update.mockImplementation(async (o) => o);

        const inicio = new Date('2024-01-01T08:00:00');
        const fim = new Date('2024-01-01T10:00:00');
        const useCase = new RealizarServicoUseCase(repo as any);
        const result = await useCase.execute('os-1', 'item-s-1', inicio, fim);

        expect(result.servicos[0].inicioExec).toEqual(inicio);
        expect(result.servicos[0].fimExec).toEqual(fim);
    });

    it('throws NotFoundException if OS not found', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new RealizarServicoUseCase(repo as any);
        await expect(useCase.execute('missing', 'item-s-1', new Date(), new Date())).rejects.toThrow(NotFoundException);
    });
});

// ─── UtilizarPecaUseCase ─────────────────────────────────────────────────────
describe('UtilizarPecaUseCase', () => {
    it('marks peca as used and triggers baixa', async () => {
        const repo = mockOsRepo();
        const baixa = { execute: jest.fn().mockResolvedValue({}) } as unknown as BaixaEstoqueUseCase;
        const os = makeOs(StatusOS.EM_EXECUCAO, {
            pecas: [{ id: 'item-p-1', pecaId: 'p-1', quantidade: 1, precoUnitario: 25, utilizada: false }],
        });
        repo.findById.mockResolvedValue(os);
        repo.update.mockImplementation(async (o) => o);

        const useCase = new UtilizarPecaUseCase(repo as any, baixa);
        await useCase.execute('os-1', 'item-p-1');

        expect(baixa.execute).toHaveBeenCalledTimes(1);
        expect(repo.update).toHaveBeenCalledTimes(1);
    });

    it('throws NotFoundException if OS not found', async () => {
        const repo = mockOsRepo();
        const baixa = { execute: jest.fn() } as unknown as BaixaEstoqueUseCase;
        repo.findById.mockResolvedValue(null);

        const useCase = new UtilizarPecaUseCase(repo as any, baixa);
        await expect(useCase.execute('missing', 'item-p-1')).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException if peca item not found in OS', async () => {
        const repo = mockOsRepo();
        const baixa = { execute: jest.fn() } as unknown as BaixaEstoqueUseCase;
        repo.findById.mockResolvedValue(makeOs());

        const useCase = new UtilizarPecaUseCase(repo as any, baixa);
        await expect(useCase.execute('os-1', 'not-there')).rejects.toThrow(NotFoundException);
    });
});

// ─── LiberarVeiculoUseCase ───────────────────────────────────────────────────
describe('LiberarVeiculoUseCase', () => {
    it('returns the OS when found', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(makeOs(StatusOS.FINALIZADA));

        const useCase = new LiberarVeiculoUseCase(repo as any);
        const result = await useCase.execute('os-1');
        expect(result.id).toBe('os-1');
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new LiberarVeiculoUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });
});

// ─── SendBudgetUseCase ───────────────────────────────────────────────────────
describe('SendBudgetUseCase', () => {
    it('returns the OS when found', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(makeOs(StatusOS.AGUARDANDO_APROVACAO));

        const useCase = new SendBudgetUseCase(repo as any);
        const result = await useCase.execute('os-1');
        expect(result.id).toBe('os-1');
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new SendBudgetUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });
});

// ─── RejectBudgetUseCase ─────────────────────────────────────────────────────
describe('RejectBudgetUseCase', () => {
    it('transitions OS to REPROVADA', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(makeOs(StatusOS.AGUARDANDO_APROVACAO));
        repo.update.mockImplementation(async (o) => o);

        const useCase = new RejectBudgetUseCase(repo as any);
        const result = await useCase.execute('os-1');
        expect(result.status).toBe(StatusOS.REPROVADA);
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new RejectBudgetUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('throws UnprocessableEntityException for invalid transition', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(makeOs(StatusOS.RECEBIDA));

        const useCase = new RejectBudgetUseCase(repo as any);
        await expect(useCase.execute('os-1')).rejects.toThrow(UnprocessableEntityException);
    });
});

// ─── UpdateOrdemDeServicoUseCase ─────────────────────────────────────────────
describe('UpdateOrdemDeServicoUseCase', () => {
    it('updates descricaoProblema', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(makeOs());
        repo.update.mockImplementation(async (o) => o);

        const useCase = new UpdateOrdemDeServicoUseCase(repo as any);
        const result = await useCase.execute('os-1', { descricaoProblema: 'Barulho novo' });
        expect(result.descricaoProblema).toBe('Barulho novo');
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new UpdateOrdemDeServicoUseCase(repo as any);
        await expect(useCase.execute('missing', {})).rejects.toThrow(NotFoundException);
    });
});

// ─── DeleteOrdemDeServicoUseCase ─────────────────────────────────────────────
describe('DeleteOrdemDeServicoUseCase', () => {
    it('throws Error because delete is not supported', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(makeOs());

        const useCase = new DeleteOrdemDeServicoUseCase(repo as any);
        await expect(useCase.execute('os-1')).rejects.toThrow('Delete not supported for OS');
    });

    it('throws NotFoundException if OS not found', async () => {
        const repo = mockOsRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new DeleteOrdemDeServicoUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });
});
