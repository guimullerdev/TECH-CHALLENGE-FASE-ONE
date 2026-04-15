import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import type { ServiceOrderRepository } from '../../domain/repositories/service-orders.repository.interface';
import { ServiceOrder } from '../../domain/entities/service-orders.entity';

@Injectable()
export class RemovePartFromOrderUseCase {
    constructor(
        @Inject('ServiceOrderRepository')
        private readonly orderRepo: ServiceOrderRepository,
    ) { }

    async execute(serviceOrderId: string, partId: string): Promise<ServiceOrder> {
        const order = await this.orderRepo.findById(serviceOrderId);
        if (!order) throw new NotFoundException(`Ordem de serviço ${serviceOrderId} não encontrada`);

        const exists = order.parts.some(p => p.partId === partId);
        if (!exists) throw new NotFoundException(`Peça ${partId} não encontrada na OS`);

        const updatedOrder = order.removePart(partId);
        await this.orderRepo.removePart(serviceOrderId, partId, updatedOrder.totalPrice);
        const result = await this.orderRepo.findById(serviceOrderId);
        return result!;
    }
}
