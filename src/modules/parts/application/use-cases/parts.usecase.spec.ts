import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreatePecaUseCase } from './create-parts.usecase';
import { GetPecaUseCase } from './get-parts.usecase';
import { UpdatePecaUseCase } from './update-parts.usecase';
import { DeactivatePecaUseCase } from './delete-parts.usecase';
import { ReactivatePecaUseCase } from './reactivate-parts.usecase';
import { Peca } from '../../domain/entities/parts.entity';
import type { IPecaRepository } from '../../domain/repositories/parts.repository.interface';

const mockRepo = (): jest.Mocked<IPecaRepository> => ({
    findById: jest.fn(),
    findByCodigo: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
});

const makePeca = (ativo = true) =>
    Peca.restore({
        id: 'p-1',
        nome: 'Filtro de óleo',
        precoUnitario: 25,
        qtdTotal: 10,
        qtdDisponivel: 10,
        qtdReservada: 0,
        codigo: 'FO-001',
        descricao: 'Filtro padrão',
        ativo,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

// ─── CreatePecaUseCase ───────────────────────────────────────────────────────
describe('CreatePecaUseCase', () => {
    it('creates and returns peca without codigo', async () => {
        const repo = mockRepo();
        repo.create.mockImplementation(async (p) => p);

        const useCase = new CreatePecaUseCase(repo as any);
        const result = await useCase.execute({ nome: 'Filtro', precoUnitario: 25 });

        expect(repo.findByCodigo).not.toHaveBeenCalled();
        expect(repo.create).toHaveBeenCalledTimes(1);
        expect(result.nome).toBe('Filtro');
    });

    it('creates and returns peca with unique codigo', async () => {
        const repo = mockRepo();
        repo.findByCodigo.mockResolvedValue(null);
        repo.create.mockImplementation(async (p) => p);

        const useCase = new CreatePecaUseCase(repo as any);
        const result = await useCase.execute({ nome: 'Filtro', precoUnitario: 25, codigo: 'FO-001' });

        expect(repo.findByCodigo).toHaveBeenCalledWith('FO-001');
        expect(result.codigo).toBe('FO-001');
    });

    it('throws ConflictException if codigo already exists', async () => {
        const repo = mockRepo();
        repo.findByCodigo.mockResolvedValue(makePeca());

        const useCase = new CreatePecaUseCase(repo as any);
        await expect(useCase.execute({ nome: 'Filtro', precoUnitario: 25, codigo: 'FO-001' })).rejects.toThrow(ConflictException);
    });
});

// ─── GetPecaUseCase ──────────────────────────────────────────────────────────
describe('GetPecaUseCase', () => {
    it('returns peca by id', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makePeca());

        const useCase = new GetPecaUseCase(repo as any);
        const result = await useCase.execute('p-1');
        expect(result.id).toBe('p-1');
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new GetPecaUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('executeAll without filters calls findAll', async () => {
        const repo = mockRepo();
        repo.findAll.mockResolvedValue([makePeca()]);

        const useCase = new GetPecaUseCase(repo as any);
        const result = await useCase.executeAll();
        expect(repo.findAll).toHaveBeenCalled();
        expect(result).toHaveLength(1);
    });

    it('executeAll with id filter uses findById', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makePeca());

        const useCase = new GetPecaUseCase(repo as any);
        const result = await useCase.executeAll({ id: 'p-1' });
        expect(result).toHaveLength(1);
    });

    it('executeAll with id filter returns [] when not found', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new GetPecaUseCase(repo as any);
        const result = await useCase.executeAll({ id: 'missing' });
        expect(result).toEqual([]);
    });
});

// ─── UpdatePecaUseCase ───────────────────────────────────────────────────────
describe('UpdatePecaUseCase', () => {
    it('updates and returns peca', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makePeca());
        repo.update.mockImplementation(async (p) => p);

        const useCase = new UpdatePecaUseCase(repo as any);
        const result = await useCase.execute('p-1', { nome: 'Filtro Premium', precoUnitario: 35 });

        expect(result.nome).toBe('Filtro Premium');
        expect(result.precoUnitario).toBe(35);
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new UpdatePecaUseCase(repo as any);
        await expect(useCase.execute('missing', { nome: 'X' })).rejects.toThrow(NotFoundException);
    });
});

// ─── DeactivatePecaUseCase ───────────────────────────────────────────────────
describe('DeactivatePecaUseCase', () => {
    it('deactivates and returns peca', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makePeca(true));
        repo.update.mockImplementation(async (p) => p);

        const useCase = new DeactivatePecaUseCase(repo as any);
        const result = await useCase.execute('p-1');
        expect(result.ativo).toBe(false);
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new DeactivatePecaUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });
});

// ─── ReactivatePecaUseCase ───────────────────────────────────────────────────
describe('ReactivatePecaUseCase', () => {
    it('reactivates and returns peca', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makePeca(false));
        repo.update.mockImplementation(async (p) => p);

        const useCase = new ReactivatePecaUseCase(repo as any);
        const result = await useCase.execute('p-1');
        expect(result.ativo).toBe(true);
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new ReactivatePecaUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });
});
