import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ApproveBudgetUseCase } from './approve-budget.usecase';
import {
    ServiceOrder,
    ServiceOrderStatus,
    InsufficientStockError,
} from '../../domain/entities/service-orders.entity';
import type { ServiceOrderRepository } from '../../domain/repositories/service-orders.repository.interface';

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

const makeApprovalReadyOrder = () =>
    ServiceOrder.create({ customerId: 'c-1', vehicleId: 'v-1', description: 'desc' })
        .addService({ id: 'i-1', serviceId: 'svc-1', price: 100 })
        .startDiagnosis()
        .finishDiagnosis(); // status: WAITING_APPROVAL, totalPrice: 100

describe('ApproveBudgetUseCase', () => {
    it('throws 404 when order is not found', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);
        const useCase = new ApproveBudgetUseCase(repo);
        await expect(useCase.execute('nonexistent')).rejects.toThrow(NotFoundException);
    });

    it('throws 422 when status is not WAITING_APPROVAL', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(
            ServiceOrder.create({ customerId: 'c-1', vehicleId: 'v-1', description: 'desc' }),
        );
        const useCase = new ApproveBudgetUseCase(repo);
        await expect(useCase.execute('order-1')).rejects.toThrow(UnprocessableEntityException);
    });

    it('throws 422 when stock is insufficient', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(makeApprovalReadyOrder());
        repo.reserveStockAndApprove.mockRejectedValue(
            new InsufficientStockError('part-1', 5, 2),
        );
        const useCase = new ApproveBudgetUseCase(repo);
        await expect(useCase.execute('order-1')).rejects.toThrow(UnprocessableEntityException);
    });

    it('calls reserveStockAndApprove with IN_PROGRESS order', async () => {
        const repo = mockRepo();
        const ready = makeApprovalReadyOrder();
        repo.findById.mockResolvedValue(ready);
        const approvedOrder = ready.approveBudget();
        repo.reserveStockAndApprove.mockResolvedValue(approvedOrder);

        const useCase = new ApproveBudgetUseCase(repo);
        const result = await useCase.execute('order-1');

        expect(repo.reserveStockAndApprove).toHaveBeenCalledTimes(1);
        const passedOrder = repo.reserveStockAndApprove.mock.calls[0][0] as ServiceOrder;
        expect(passedOrder.status).toBe(ServiceOrderStatus.IN_PROGRESS);
        expect(result.status).toBe(ServiceOrderStatus.IN_PROGRESS);
    });
});
