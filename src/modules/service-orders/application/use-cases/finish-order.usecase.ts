import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import type { ServiceOrderRepository } from '../../domain/repositories/service-orders.repository.interface';
import { InvalidTransitionError, ServiceOrder } from '../../domain/entities/service-orders.entity';

@Injectable()
export class FinishOrderUseCase {
    constructor(
        @Inject('ServiceOrderRepository')
        private readonly repo: ServiceOrderRepository,
    ) { }

    async execute(id: string): Promise<ServiceOrder> {
        const order = await this.repo.findById(id);
        if (!order) throw new NotFoundException(`Ordem de serviço ${id} não encontrada`);

        let updated: ServiceOrder;
        try {
            // Feature 17: stock was already atomically deducted when the budget was approved
            // (reserveStockAndApprove). Finishing the OS confirms the state transition only —
            // no additional stockQty change is needed, making this operation idempotent.
            updated = order.finish();
        } catch (err) {
            if (err instanceof InvalidTransitionError) throw new UnprocessableEntityException(err.message);
            throw err;
        }

        return this.repo.save(updated);
    }
}
