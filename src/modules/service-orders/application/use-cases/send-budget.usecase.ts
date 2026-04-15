import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import type { ServiceOrderRepository } from '../../domain/repositories/service-orders.repository.interface';
import { InvalidTransitionError, ServiceOrder } from '../../domain/entities/service-orders.entity';

@Injectable()
export class SendBudgetUseCase {
    constructor(
        @Inject('ServiceOrderRepository')
        private readonly repo: ServiceOrderRepository,
    ) { }

    async execute(id: string): Promise<ServiceOrder> {
        const order = await this.repo.findById(id);
        if (!order) throw new NotFoundException(`Ordem de serviço ${id} não encontrada`);

        try {
            order.validateBudget();
        } catch (err) {
            if (err instanceof InvalidTransitionError) throw new UnprocessableEntityException(err.message);
            throw err;
        }

        // Budget is valid — return the current order with full item detail.
        // No status transition: status remains WAITING_APPROVAL.
        return order;
    }
}
