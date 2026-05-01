import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ApproveBudgetUseCase } from './approve-budget.usecase';
import { OrdemDeServico, StatusOS } from '../../domain/entities/service-orders.entity';
import { IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';

const mockRepo = (): jest.Mocked<IOrdemDeServicoRepository> => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    generateNumero: jest.fn(),
});

const makeApprovalReadyOrder = () =>
    OrdemDeServico.create({ numero: 'OS-001', clienteId: 'c-1', veiculoId: 'v-1' })
        .iniciarDiagnostico()
        .concluirDiagnostico();

describe('ApproveBudgetUseCase', () => {
    it('throws 404 when order is not found', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(null);
        const useCase = new ApproveBudgetUseCase(repo as any);
        await expect(useCase.execute('nonexistent')).rejects.toThrow(NotFoundException);
    });

    it('throws 422 when status is not AGUARDANDO_APROVACAO', async () => {
        const repo = mockRepo();
        repo.findById.mockResolvedValue(
            OrdemDeServico.create({ numero: 'OS-001', clienteId: 'c-1', veiculoId: 'v-1' }),
        );
        const useCase = new ApproveBudgetUseCase(repo as any);
        await expect(useCase.execute('order-1')).rejects.toThrow(UnprocessableEntityException);
    });

    it('approves order and transitions status to APROVADA', async () => {
        const repo = mockRepo();
        const ready = makeApprovalReadyOrder();
        const approved = ready.aprovarOrcamento();
        repo.findById.mockResolvedValue(ready);
        repo.update.mockResolvedValue(approved);

        const useCase = new ApproveBudgetUseCase(repo as any);
        const result = await useCase.execute('order-1');

        expect(repo.update).toHaveBeenCalledTimes(1);
        expect(result.status).toBe(StatusOS.APROVADA);
    });

    it('rethrows unexpected errors from aprovarOrcamento', async () => {
        const repo = mockRepo();
        const ready = makeApprovalReadyOrder();
        jest.spyOn(ready, 'aprovarOrcamento').mockImplementation(() => { throw new Error('unexpected-ab'); });
        repo.findById.mockResolvedValue(ready);

        const useCase = new ApproveBudgetUseCase(repo as any);
        await expect(useCase.execute('order-1')).rejects.toThrow('unexpected-ab');
    });
});
