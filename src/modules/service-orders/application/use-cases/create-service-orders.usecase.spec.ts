import { BadRequestException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateOrdemDeServicoUseCase } from './create-service-orders.usecase';
import { OrdemDeServico, StatusOS } from '../../domain/entities/service-orders.entity';
import { IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { IVeiculoRepository } from '../../../vehicles/domain/repositories/vehicle.repository.interface';
import { IClienteRepository } from '../../../customers/domain/repositories/customers.repository.interface';
import { Veiculo } from '../../../vehicles/domain/entities/vehicle.entity';
import { Cliente } from '../../../customers/domain/entities/customers.entity';

const mockOsRepo = (): jest.Mocked<IOrdemDeServicoRepository> => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    generateNumero: jest.fn(),
});

const mockVeiculoRepo = (): jest.Mocked<IVeiculoRepository> => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    findByPlaca: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
});

const mockClienteRepo = (): jest.Mocked<IClienteRepository> => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    findByDocumento: jest.fn(),
    findByNome: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
});

const makeVeiculo = (id: string, clienteId: string, ativo = true): Veiculo =>
    Veiculo.restore({ id, placa: 'ABC1234', marca: 'Fiat', modelo: 'Uno', clienteId, ativo, createdAt: new Date(), updatedAt: new Date() });

const makeCliente = (id: string, ativo = true): Cliente =>
    Cliente.restore({ id, nome: 'Cliente Teste', documento: '52998224725', ativo, createdAt: new Date(), updatedAt: new Date() });

describe('CreateOrdemDeServicoUseCase', () => {
    it('creates a service order and returns it', async () => {
        const repo = mockOsRepo();
        const veiculoRepo = mockVeiculoRepo();
        const clienteRepo = mockClienteRepo();
        repo.generateNumero.mockResolvedValue('OS-001');
        repo.create.mockImplementation(async (o) => o);
        clienteRepo.findById.mockResolvedValue(makeCliente('c-1'));
        veiculoRepo.findById.mockResolvedValue(makeVeiculo('v-1', 'c-1'));

        const useCase = new CreateOrdemDeServicoUseCase(repo as any, veiculoRepo as any, clienteRepo as any);
        const result = await useCase.execute({ clienteId: 'c-1', veiculoId: 'v-1' });

        expect(repo.create).toHaveBeenCalledTimes(1);
        expect(result.status).toBe(StatusOS.RECEBIDA);
        expect(result.numero).toBe('OS-001');
    });

    it('passes the correct entity to repo.create', async () => {
        const repo = mockOsRepo();
        const veiculoRepo = mockVeiculoRepo();
        const clienteRepo = mockClienteRepo();
        repo.generateNumero.mockResolvedValue('OS-002');
        repo.create.mockImplementation(async (o) => o);
        clienteRepo.findById.mockResolvedValue(makeCliente('c-1'));
        veiculoRepo.findById.mockResolvedValue(makeVeiculo('v-1', 'c-1'));

        const useCase = new CreateOrdemDeServicoUseCase(repo as any, veiculoRepo as any, clienteRepo as any);
        const result = await useCase.execute({ clienteId: 'c-1', veiculoId: 'v-1', descricaoProblema: 'Problema' });

        const saved = repo.create.mock.calls[0][0] as OrdemDeServico;
        expect(saved.clienteId).toBe('c-1');
        expect(saved.veiculoId).toBe('v-1');
        expect(saved.descricaoProblema).toBe('Problema');
    });

    it('throws NotFoundException when customer does not exist', async () => {
        const repo = mockOsRepo();
        const veiculoRepo = mockVeiculoRepo();
        const clienteRepo = mockClienteRepo();
        clienteRepo.findById.mockResolvedValue(null);

        const useCase = new CreateOrdemDeServicoUseCase(repo as any, veiculoRepo as any, clienteRepo as any);
        await expect(useCase.execute({ clienteId: 'c-inexistente', veiculoId: 'v-1' }))
            .rejects.toThrow(NotFoundException);
    });

    it('throws UnprocessableEntityException when customer is inactive', async () => {
        const repo = mockOsRepo();
        const veiculoRepo = mockVeiculoRepo();
        const clienteRepo = mockClienteRepo();
        clienteRepo.findById.mockResolvedValue(makeCliente('c-1', false));

        const useCase = new CreateOrdemDeServicoUseCase(repo as any, veiculoRepo as any, clienteRepo as any);
        await expect(useCase.execute({ clienteId: 'c-1', veiculoId: 'v-1' }))
            .rejects.toThrow(UnprocessableEntityException);
    });

    it('throws NotFoundException when vehicle does not exist', async () => {
        const repo = mockOsRepo();
        const veiculoRepo = mockVeiculoRepo();
        const clienteRepo = mockClienteRepo();
        clienteRepo.findById.mockResolvedValue(makeCliente('c-1'));
        veiculoRepo.findById.mockResolvedValue(null);

        const useCase = new CreateOrdemDeServicoUseCase(repo as any, veiculoRepo as any, clienteRepo as any);
        await expect(useCase.execute({ clienteId: 'c-1', veiculoId: 'v-inexistente' }))
            .rejects.toThrow(NotFoundException);
    });

    it('throws UnprocessableEntityException when vehicle is inactive', async () => {
        const repo = mockOsRepo();
        const veiculoRepo = mockVeiculoRepo();
        const clienteRepo = mockClienteRepo();
        clienteRepo.findById.mockResolvedValue(makeCliente('c-1'));
        veiculoRepo.findById.mockResolvedValue(makeVeiculo('v-1', 'c-1', false));

        const useCase = new CreateOrdemDeServicoUseCase(repo as any, veiculoRepo as any, clienteRepo as any);
        await expect(useCase.execute({ clienteId: 'c-1', veiculoId: 'v-1' }))
            .rejects.toThrow(UnprocessableEntityException);
    });

    it('throws BadRequestException when vehicle belongs to a different customer', async () => {
        const repo = mockOsRepo();
        const veiculoRepo = mockVeiculoRepo();
        const clienteRepo = mockClienteRepo();
        clienteRepo.findById.mockResolvedValue(makeCliente('c-1'));
        veiculoRepo.findById.mockResolvedValue(makeVeiculo('v-1', 'c-outro'));

        const useCase = new CreateOrdemDeServicoUseCase(repo as any, veiculoRepo as any, clienteRepo as any);
        await expect(useCase.execute({ clienteId: 'c-1', veiculoId: 'v-1' }))
            .rejects.toThrow(BadRequestException);
    });
});
