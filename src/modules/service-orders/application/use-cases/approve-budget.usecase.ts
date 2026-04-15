import {
    Inject,
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';

import type { ServiceOrderRepository } from '../../domain/repositories/service-orders.repository.interface';
import {
    InsufficientStockError,
    InvalidTransitionError,
    ServiceOrder,
} from '../../domain/entities/service-orders.entity';

@Injectable()
export class ApproveBudgetUseCase {
    constructor(
        @Inject('ServiceOrderRepository')
        private readonly repo: ServiceOrderRepository,
    ) { }

    async execute(id: string): Promise<ServiceOrder> {
        const order = await this.repo.findById(id);
        if (!order) throw new NotFoundException(`Ordem de serviço ${id} não encontrada`);

        let updated: ServiceOrder;
        try {
            updated = order.approveBudget();
        } catch (err) {
            if (err instanceof InvalidTransitionError) throw new UnprocessableEntityException(err.message);
            throw err;
        }

        try {
            // Feature 16: atomically validates stock, decrements stockQty for every part,
            // and persists the IN_PROGRESS status — full rollback if any part is short.
            return await this.repo.reserveStockAndApprove(updated);
        } catch (err) {
            if (err instanceof InsufficientStockError) throw new UnprocessableEntityException(err.message);
            throw err;
        }
    }
}
