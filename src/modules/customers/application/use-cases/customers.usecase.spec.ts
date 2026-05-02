import { ConflictException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateClienteUseCase } from './create-customers.usecase';
import { GetClienteUseCase } from './get-customers.usecase';
import { UpdateClienteUseCase } from './update-customers.usecase';
import { DeactivateClienteUseCase } from './delete-customers.usecase';
import { Cliente } from '../../domain/entities/customers.entity';
import type { IClienteRepository } from '../../domain/repositories/customers.repository.interface';

const mockRepo = (): jest.Mocked<IClienteRepository> => ({
    findById: jest.fn(),
    findByDocumento: jest.fn(),
    findByNome: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
});

const makeCliente = (overrides: Partial<Parameters<typeof Cliente.restore>[0]> = {}) =>
    Cliente.restore({
        id: 'c-1',
        nome: 'João Silva',
        documento: '52998224725',
        telefone: '11999999999',
        email: 'joao@example.com',
        endereco: 'Rua A, 1',
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...overrides,
    });

// ─── CreateClienteUseCase ────────────────────────────────────────────────────
describe('CreateClienteUseCase', () => {
    it('creates and returns cliente', async () => {
        const repo = mockRepo();
        repo.findByDocumento.mockResolvedValue(null);
        repo.create.mockImplementation(async (c) => c);

        const useCase = new CreateClienteUseCase(repo as any);
        const result = await useCase.execute({ nome: 'João', documento: '52998224725' });

        expect(repo.create).toHaveBeenCalledTimes(1);
        expect(result.documento).toBe('52998224725');
    });

    it('throws ConflictException if documento already exists', async () => {
        const repo = mockRepo();
        repo.findByDocumento.mockResolvedValue(makeCliente());

        const useCase = new CreateClienteUseCase(repo as any);
        await expect(useCase.execute({ nome: 'João', documento: '52998224725' })).rejects.toThrow(ConflictException);
    });
});

// ─── GetClienteUseCase ───────────────────────────────────────────────────────
describe('GetClienteUseCase', () => {
    it('returns cliente by id', async () => {
        const repo = mockRepo();
        const cliente = makeCliente();
        repo.findById.mockResolvedValue(cliente);

        const useCase = new GetClienteUseCase(repo as any);
        const result = await useCase.execute('c-1');
        expect(result.id).toBe('c-1');
    });

    it('throws NotFoundException if cliente not found by id', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new GetClienteUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('executeAll without filters calls findAll', async () => {
        const repo = mockRepo();
        repo.findAll.mockResolvedValue([]);

        const useCase = new GetClienteUseCase(repo as any);
        const result = await useCase.executeAll();
        expect(repo.findAll).toHaveBeenCalled();
        expect(result).toEqual([]);
    });

    it('executeAll with id filter uses findById', async () => {
        const repo = mockRepo();
        const cliente = makeCliente();
        repo.findById.mockResolvedValue(cliente);

        const useCase = new GetClienteUseCase(repo as any);
        const result = await useCase.executeAll({ id: 'c-1' });
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('c-1');
    });

    it('executeAll with id filter returns [] when not found', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new GetClienteUseCase(repo as any);
        const result = await useCase.executeAll({ id: 'missing' });
        expect(result).toEqual([]);
    });

    it('executeAll with documento filter uses findByDocumento', async () => {
        const repo = mockRepo();
        const cliente = makeCliente();
        repo.findByDocumento.mockResolvedValue(cliente);

        const useCase = new GetClienteUseCase(repo as any);
        const result = await useCase.executeAll({ documento: '52998224725' });
        expect(result).toHaveLength(1);
    });

    it('executeAll with nome filter uses findByNome', async () => {
        const repo = mockRepo();
        repo.findByNome.mockResolvedValue([makeCliente()]);

        const useCase = new GetClienteUseCase(repo as any);
        const result = await useCase.executeAll({ nome: 'João' });
        expect(repo.findByNome).toHaveBeenCalledWith('João');
        expect(result).toHaveLength(1);
    });
});

// ─── UpdateClienteUseCase ────────────────────────────────────────────────────
describe('UpdateClienteUseCase', () => {
    it('updates and returns cliente', async () => {
        const repo = mockRepo();
        const cliente = makeCliente();
        repo.findById.mockResolvedValue(cliente);
        repo.update.mockImplementation(async (c) => c);

        const useCase = new UpdateClienteUseCase(repo as any);
        const result = await useCase.execute('c-1', { nome: 'João Atualizado' });

        expect(repo.update).toHaveBeenCalledTimes(1);
        expect(result.nome).toBe('João Atualizado');
    });

    it('throws NotFoundException if cliente not found', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new UpdateClienteUseCase(repo as any);
        await expect(useCase.execute('missing', { nome: 'X' })).rejects.toThrow(NotFoundException);
    });
});

// ─── DeactivateClienteUseCase ────────────────────────────────────────────────
const mockPrisma = () => ({
    ordemDeServico: {
        findFirst: jest.fn().mockResolvedValue(null),
    },
});

describe('DeactivateClienteUseCase', () => {
    it('deactivates and returns cliente', async () => {
        const repo = mockRepo();
        const prisma = mockPrisma();
        const cliente = makeCliente();
        repo.findById.mockResolvedValue(cliente);
        repo.update.mockImplementation(async (c) => c);

        const useCase = new DeactivateClienteUseCase(repo as any, prisma as any);
        const result = await useCase.execute('c-1');

        expect(repo.update).toHaveBeenCalledTimes(1);
        expect(result.ativo).toBe(false);
    });

    it('throws NotFoundException if cliente not found', async () => {
        const repo = mockRepo();
        const prisma = mockPrisma();
        repo.findById.mockResolvedValue(null);

        const useCase = new DeactivateClienteUseCase(repo as any, prisma as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('throws UnprocessableEntityException if cliente has open OS', async () => {
        const repo = mockRepo();
        const prisma = mockPrisma();
        const cliente = makeCliente();
        repo.findById.mockResolvedValue(cliente);
        prisma.ordemDeServico.findFirst.mockResolvedValue({ numero: 'OS-2024-000001' });

        const useCase = new DeactivateClienteUseCase(repo as any, prisma as any);
        await expect(useCase.execute('c-1')).rejects.toThrow(UnprocessableEntityException);
    });
});
