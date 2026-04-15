import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import type { ServiceOrderRepository } from '../../domain/repositories/service-orders.repository.interface';
import { ServiceOrder } from '../../domain/entities/service-orders.entity';

@Injectable()
export class RemoveServiceFromOrderUseCase {
    constructor(
        @Inject('ServiceOrderRepository')
        private readonly orderRepo: ServiceOrderRepository,
    ) { }

    async execute(serviceOrderId: string, serviceId: string): Promise<ServiceOrder> {
        const order = await this.orderRepo.findById(serviceOrderId);
        if (!order) throw new NotFoundException(`Ordem de serviço ${serviceOrderId} não encontrada`);

        const exists = order.services.some(s => s.serviceId === serviceId);
        if (!exists) throw new NotFoundException(`Serviço ${serviceId} não encontrado na OS`);

        const updatedOrder = order.removeService(serviceId);
        await this.orderRepo.removeService(serviceOrderId, serviceId, updatedOrder.totalPrice);
        const result = await this.orderRepo.findById(serviceOrderId);
        return result!;
    }
}
