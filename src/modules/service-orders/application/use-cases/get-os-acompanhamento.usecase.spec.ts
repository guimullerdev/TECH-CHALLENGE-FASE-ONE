import { NotFoundException } from '@nestjs/common';
import { GetOsAcompanhamentoUseCase } from './get-os-acompanhamento.usecase';
import { OrdemDeServico, StatusOS } from '../../domain/entities/service-orders.entity';
import { HistoricoStatusOS } from '../../domain/entities/historico-status-os.entity';
import type { IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';

const mockRepo = (): jest.Mocked<IOrdemDeServicoRepository> => ({
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    generateNumero: jest.fn(),
});

const makeOs = () =>
    OrdemDeServico.restore({
        id: 'os-1',
        numero: 'OS-2024-000001',
        clienteId: 'c-1',
        veiculoId: 'v-1',
        status: StatusOS.EM_DIAGNOSTICO,
        servicos: [{ id: 'svc-item-1', servicoId: 's-1', precoUnitario: 100, status: 'pendente' }],
        pecas: [{ id: 'peca-item-1', pecaId: 'p-1', quantidade: 2, valorUnitario: 50, status: 'reservada' }],
        historicoStatus: [
            HistoricoStatusOS.restore({ id: 'h-1', statusAnterior: null, statusNovo: StatusOS.RECEBIDA, data: new Date('2024-01-01T08:00:00Z') }),
            HistoricoStatusOS.restore({ id: 'h-2', statusAnterior: StatusOS.RECEBIDA, statusNovo: StatusOS.EM_DIAGNOSTICO, data: new Date('2024-01-01T09:00:00Z') }),
        ],
        dataAbertura: new Date('2024-01-01T08:00:00Z'),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    });

describe('GetOsAcompanhamentoUseCase', () => {
    it('throws NotFoundException when OS not found', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new GetOsAcompanhamentoUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('returns statusAtual and numero', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makeOs());

        const useCase = new GetOsAcompanhamentoUseCase(repo as any);
        const result = await useCase.execute('os-1');

        expect(result.id).toBe('os-1');
        expect(result.numero).toBe('OS-2024-000001');
        expect(result.statusAtual).toBe(StatusOS.EM_DIAGNOSTICO);
    });

    it('returns historicoStatus with all transitions', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makeOs());

        const useCase = new GetOsAcompanhamentoUseCase(repo as any);
        const result = await useCase.execute('os-1');

        expect(result.historicoStatus).toHaveLength(2);
        expect(result.historicoStatus[0].statusAnterior).toBeNull();
        expect(result.historicoStatus[0].statusNovo).toBe(StatusOS.RECEBIDA);
        expect(result.historicoStatus[1].statusAnterior).toBe(StatusOS.RECEBIDA);
        expect(result.historicoStatus[1].statusNovo).toBe(StatusOS.EM_DIAGNOSTICO);
    });

    it('returns servicos with status only (no pricing)', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makeOs());

        const useCase = new GetOsAcompanhamentoUseCase(repo as any);
        const result = await useCase.execute('os-1');

        expect(result.servicos).toHaveLength(1);
        expect(result.servicos[0].servicoId).toBe('s-1');
        expect(result.servicos[0].status).toBe('pendente');
        expect((result.servicos[0] as any).precoUnitario).toBeUndefined();
    });

    it('returns pecas with status and quantity only (no pricing)', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makeOs());

        const useCase = new GetOsAcompanhamentoUseCase(repo as any);
        const result = await useCase.execute('os-1');

        expect(result.pecas).toHaveLength(1);
        expect(result.pecas[0].pecaId).toBe('p-1');
        expect(result.pecas[0].quantidade).toBe(2);
        expect(result.pecas[0].status).toBe('reservada');
        expect((result.pecas[0] as any).valorUnitario).toBeUndefined();
    });

    it('returns dataAbertura and undefined dataFechamento for open OS', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makeOs());

        const useCase = new GetOsAcompanhamentoUseCase(repo as any);
        const result = await useCase.execute('os-1');

        expect(result.dataAbertura).toBeInstanceOf(Date);
        expect(result.dataFechamento).toBeUndefined();
    });
});
