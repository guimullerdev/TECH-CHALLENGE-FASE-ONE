import { CreateServiceOrderUseCase } from './create-service-orders.usecase';
import { ServiceOrder, ServiceOrderStatus } from '../../domain/entities/service-orders.entity';
import type { ServiceOrderRepository } from '../../domain/repositories/service-orders.repository.interface';

const makeOrder = () =>
    ServiceOrder.create({ customerId: 'c-1', vehicleId: 'v-1', description: 'desc' });

const mockRepo = (): jest.Mocked<ServiceOrderRepository> => ({
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    addService: jest.fn(),
    removeService: jest.fn(),
    addPart: jest.fn(),
    removePart: jest.fn(),
    reserveStockAndApprove: jest.fn(),
});

describe('CreateServiceOrderUseCase', () => {
    it('creates a service order and returns it', async () => {
        const repo = mockRepo();
        const order = makeOrder();
        repo.create.mockResolvedValue(order);

        const useCase = new CreateServiceOrderUseCase(repo);
        const result = await useCase.execute({ customerId: 'c-1', vehicleId: 'v-1', description: 'desc' });

        expect(repo.create).toHaveBeenCalledTimes(1);
        expect(result.status).toBe(ServiceOrderStatus.RECEIVED);
        expect(result.totalPrice).toBe(0);
    });

    it('passes the correct entity to repo.create', async () => {
        const repo = mockRepo();
        repo.create.mockImplementation(async (o) => o);

        const useCase = new CreateServiceOrderUseCase(repo);
        const result = await useCase.execute({ customerId: 'c-1', vehicleId: 'v-1', description: 'Teste' });

        const saved = repo.create.mock.calls[0][0] as ServiceOrder;
        expect(saved.customerId).toBe('c-1');
        expect(saved.vehicleId).toBe('v-1');
        expect(saved.description).toBe('Teste');
    });
});
