import { NotFoundException } from '@nestjs/common';
import { CreateServicoUseCase } from './create-services.use-case';
import { GetServicoUseCase } from './get-services.use-case';
import { UpdateServicoUseCase } from './update-services.use-case';
import { DeactivateServicoUseCase } from './delete-services.use-case';
import { ReactivateServicoUseCase } from './reactivate-services.use-case';
import { Servico } from '../../domain/entities/services.entity';
import type { IServicoRepository } from '../../domain/repositories/services.repository';

const mockRepo = (): jest.Mocked<IServicoRepository> => ({
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
});

const makeServico = (ativo = true) =>
    Servico.restore({
        id: 's-1',
        nome: 'Troca de óleo',
        precoBase: 80,
        descricao: 'Serviço padrão',
        ativo,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

// ─── CreateServicoUseCase ────────────────────────────────────────────────────
describe('CreateServicoUseCase', () => {
    it('creates and returns servico', async () => {
        const repo = mockRepo();
        repo.create.mockImplementation(async (s) => s);

        const useCase = new CreateServicoUseCase(repo as any);
        const result = await useCase.execute({ nome: 'Troca de óleo', precoBase: 80 });

        expect(repo.create).toHaveBeenCalledTimes(1);
        expect(result.nome).toBe('Troca de óleo');
        expect(result.precoBase).toBe(80);
    });
});

// ─── GetServicoUseCase ───────────────────────────────────────────────────────
describe('GetServicoUseCase', () => {
    it('returns servico by id', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makeServico());

        const useCase = new GetServicoUseCase(repo as any);
        const result = await useCase.execute('s-1');
        expect(result.id).toBe('s-1');
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new GetServicoUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('executeAll without id calls findAll', async () => {
        const repo = mockRepo();
        repo.findAll.mockResolvedValue([makeServico()]);

        const useCase = new GetServicoUseCase(repo as any);
        const result = await useCase.executeAll();
        expect(repo.findAll).toHaveBeenCalled();
        expect(result).toHaveLength(1);
    });

    it('executeAll with id uses findById', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makeServico());

        const useCase = new GetServicoUseCase(repo as any);
        const result = await useCase.executeAll({ id: 's-1' });
        expect(result).toHaveLength(1);
    });

    it('executeAll with id returns [] when not found', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new GetServicoUseCase(repo as any);
        const result = await useCase.executeAll({ id: 'missing' });
        expect(result).toEqual([]);
    });
});

// ─── UpdateServicoUseCase ────────────────────────────────────────────────────
describe('UpdateServicoUseCase', () => {
    it('updates and returns servico', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makeServico());
        repo.update.mockImplementation(async (s) => s);

        const useCase = new UpdateServicoUseCase(repo as any);
        const result = await useCase.execute('s-1', { nome: 'Revisão', precoBase: 150 });

        expect(result.nome).toBe('Revisão');
        expect(result.precoBase).toBe(150);
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new UpdateServicoUseCase(repo as any);
        await expect(useCase.execute('missing', { nome: 'X' })).rejects.toThrow(NotFoundException);
    });
});

// ─── DeactivateServicoUseCase ────────────────────────────────────────────────
describe('DeactivateServicoUseCase', () => {
    it('deactivates and returns servico', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makeServico(true));
        repo.update.mockImplementation(async (s) => s);

        const useCase = new DeactivateServicoUseCase(repo as any);
        const result = await useCase.execute('s-1');
        expect(result.ativo).toBe(false);
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new DeactivateServicoUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });
});

// ─── ReactivateServicoUseCase ────────────────────────────────────────────────
describe('ReactivateServicoUseCase', () => {
    it('reactivates and returns servico', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makeServico(false));
        repo.update.mockImplementation(async (s) => s);

        const useCase = new ReactivateServicoUseCase(repo as any);
        const result = await useCase.execute('s-1');
        expect(result.ativo).toBe(true);
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new ReactivateServicoUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });
});
