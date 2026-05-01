import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateVeiculoUseCase } from './create-vehicle.usecase';
import { GetVeiculoUseCase } from './get-vehicle.usecase';
import { UpdateVeiculoUseCase } from './update-vehicle.usecase';
import { DeactivateVeiculoUseCase } from './delete-vehicle.usecase';
import { Veiculo } from '../../domain/entities/vehicle.entity';
import { Cliente } from '../../../customers/domain/entities/customers.entity';
import type { IVeiculoRepository } from '../../domain/repositories/vehicle.repository.interface';
import type { IClienteRepository } from '../../../customers/domain/repositories/customers.repository.interface';

const mockVeiculoRepo = (): jest.Mocked<IVeiculoRepository> => ({
    findById: jest.fn(),
    findByPlaca: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
});

const mockClienteRepo = (): jest.Mocked<IClienteRepository> => ({
    findById: jest.fn(),
    findByDocumento: jest.fn(),
    findByNome: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
});

const makeVeiculo = () =>
    Veiculo.restore({
        id: 'v-1',
        placa: 'ABC1234',
        marca: 'Toyota',
        modelo: 'Corolla',
        clienteId: 'c-1',
        ano: 2020,
        cor: 'Prata',
        kmAtual: 50000,
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

const makeCliente = () =>
    Cliente.restore({
        id: 'c-1',
        nome: 'João',
        documento: '000',
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

// ─── CreateVeiculoUseCase ────────────────────────────────────────────────────
describe('CreateVeiculoUseCase', () => {
    it('creates and returns veiculo', async () => {
        const veiculoRepo = mockVeiculoRepo();
        const clienteRepo = mockClienteRepo();
        clienteRepo.findById.mockResolvedValue(makeCliente());
        veiculoRepo.findByPlaca.mockResolvedValue(null);
        veiculoRepo.create.mockImplementation(async (v) => v);

        const useCase = new CreateVeiculoUseCase(veiculoRepo as any, clienteRepo as any);
        const result = await useCase.execute({ placa: 'ABC1234', marca: 'Toyota', modelo: 'Corolla', clienteId: 'c-1' });

        expect(veiculoRepo.create).toHaveBeenCalledTimes(1);
        expect(result.placa).toBe('ABC1234');
    });

    it('throws NotFoundException if cliente not found', async () => {
        const veiculoRepo = mockVeiculoRepo();
        const clienteRepo = mockClienteRepo();
        clienteRepo.findById.mockResolvedValue(null);

        const useCase = new CreateVeiculoUseCase(veiculoRepo as any, clienteRepo as any);
        await expect(useCase.execute({ placa: 'XYZ', marca: 'X', modelo: 'Y', clienteId: 'missing' })).rejects.toThrow(NotFoundException);
    });

    it('throws ConflictException if placa already exists', async () => {
        const veiculoRepo = mockVeiculoRepo();
        const clienteRepo = mockClienteRepo();
        clienteRepo.findById.mockResolvedValue(makeCliente());
        veiculoRepo.findByPlaca.mockResolvedValue(makeVeiculo());

        const useCase = new CreateVeiculoUseCase(veiculoRepo as any, clienteRepo as any);
        await expect(useCase.execute({ placa: 'ABC1234', marca: 'X', modelo: 'Y', clienteId: 'c-1' })).rejects.toThrow(ConflictException);
    });
});

// ─── GetVeiculoUseCase ───────────────────────────────────────────────────────
describe('GetVeiculoUseCase', () => {
    it('returns veiculo by id', async () => {
        const repo = mockVeiculoRepo();
        repo.findById.mockResolvedValue(makeVeiculo());

        const useCase = new GetVeiculoUseCase(repo as any);
        const result = await useCase.execute('v-1');
        expect(result.id).toBe('v-1');
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockVeiculoRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new GetVeiculoUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });

    it('executeAll without filters calls findAll', async () => {
        const repo = mockVeiculoRepo();
        repo.findAll.mockResolvedValue([]);

        const useCase = new GetVeiculoUseCase(repo as any);
        const result = await useCase.executeAll();
        expect(repo.findAll).toHaveBeenCalled();
        expect(result).toEqual([]);
    });

    it('executeAll with id filter uses findById', async () => {
        const repo = mockVeiculoRepo();
        repo.findById.mockResolvedValue(makeVeiculo());

        const useCase = new GetVeiculoUseCase(repo as any);
        const result = await useCase.executeAll({ id: 'v-1' });
        expect(result).toHaveLength(1);
    });

    it('executeAll with id returns [] when not found', async () => {
        const repo = mockVeiculoRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new GetVeiculoUseCase(repo as any);
        const result = await useCase.executeAll({ id: 'missing' });
        expect(result).toEqual([]);
    });

    it('executeAll with clienteId filter passes it to findAll', async () => {
        const repo = mockVeiculoRepo();
        repo.findAll.mockResolvedValue([makeVeiculo()]);

        const useCase = new GetVeiculoUseCase(repo as any);
        const result = await useCase.executeAll({ clienteId: 'c-1', placa: 'ABC-1234', ativo: true });
        expect(repo.findAll).toHaveBeenCalledWith({ clienteId: 'c-1', placa: 'ABC-1234', ativo: true });
        expect(result).toHaveLength(1);
    });
});

// ─── UpdateVeiculoUseCase ────────────────────────────────────────────────────
describe('UpdateVeiculoUseCase', () => {
    it('updates and returns veiculo', async () => {
        const repo = mockVeiculoRepo();
        repo.findById.mockResolvedValue(makeVeiculo());
        repo.update.mockImplementation(async (v) => v);

        const useCase = new UpdateVeiculoUseCase(repo as any);
        const result = await useCase.execute('v-1', { marca: 'Honda', modelo: 'Civic' });

        expect(result.marca).toBe('Honda');
        expect(result.modelo).toBe('Civic');
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockVeiculoRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new UpdateVeiculoUseCase(repo as any);
        await expect(useCase.execute('missing', { marca: 'X' })).rejects.toThrow(NotFoundException);
    });
});

// ─── DeactivateVeiculoUseCase ────────────────────────────────────────────────
describe('DeactivateVeiculoUseCase', () => {
    it('deactivates and returns veiculo', async () => {
        const repo = mockVeiculoRepo();
        repo.findById.mockResolvedValue(makeVeiculo());
        repo.update.mockImplementation(async (v) => v);

        const useCase = new DeactivateVeiculoUseCase(repo as any);
        const result = await useCase.execute('v-1');
        expect(result.ativo).toBe(false);
    });

    it('throws NotFoundException if not found', async () => {
        const repo = mockVeiculoRepo();
        repo.findById.mockResolvedValue(null);

        const useCase = new DeactivateVeiculoUseCase(repo as any);
        await expect(useCase.execute('missing')).rejects.toThrow(NotFoundException);
    });
});
