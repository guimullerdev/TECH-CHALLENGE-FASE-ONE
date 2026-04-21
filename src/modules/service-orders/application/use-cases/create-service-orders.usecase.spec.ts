import { CreateOrdemDeServicoUseCase } from './create-service-orders.usecase';
import { OrdemDeServico, StatusOS } from '../../domain/entities/service-orders.entity';
import { IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';

const mockRepo = (): jest.Mocked<IOrdemDeServicoRepository> => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    generateNumero: jest.fn(),
});

describe('CreateOrdemDeServicoUseCase', () => {
    it('creates a service order and returns it', async () => {
        const repo = mockRepo();
        repo.generateNumero.mockResolvedValue('OS-001');
        repo.create.mockImplementation(async (o) => o);

        const useCase = new CreateOrdemDeServicoUseCase(repo as any);
        const result = await useCase.execute({ clienteId: 'c-1', veiculoId: 'v-1' });

        expect(repo.create).toHaveBeenCalledTimes(1);
        expect(result.status).toBe(StatusOS.RECEBIDA);
        expect(result.numero).toBe('OS-001');
    });

    it('passes the correct entity to repo.create', async () => {
        const repo = mockRepo();
        repo.generateNumero.mockResolvedValue('OS-002');
        repo.create.mockImplementation(async (o) => o);

        const useCase = new CreateOrdemDeServicoUseCase(repo as any);
        const result = await useCase.execute({ clienteId: 'c-1', veiculoId: 'v-1', descricaoProblema: 'Problema' });

        const saved = repo.create.mock.calls[0][0] as OrdemDeServico;
        expect(saved.clienteId).toBe('c-1');
        expect(saved.veiculoId).toBe('v-1');
        expect(saved.descricaoProblema).toBe('Problema');
    });
});
