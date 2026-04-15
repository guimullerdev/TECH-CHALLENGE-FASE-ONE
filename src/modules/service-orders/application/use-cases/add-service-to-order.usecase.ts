import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import type { ServiceOrderRepository } from '../../domain/repositories/service-orders.repository.interface';
import { ServiceOrder } from '../../domain/entities/service-orders.entity';
import { ServicesRepository } from 'src/modules/services/domain/repositories/services.repository';

@Injectable()
export class AddServiceToOrderUseCase {
    constructor(
        @Inject('ServiceOrderRepository')
        private readonly orderRepo: ServiceOrderRepository,
        private readonly servicesRepo: ServicesRepository,
    ) { }

    async execute(serviceOrderId: string, serviceId: string): Promise<ServiceOrder> {
        const order = await this.orderRepo.findById(serviceOrderId);
        if (!order) throw new NotFoundException(`Ordem de serviço ${serviceOrderId} não encontrada`);

        const service = await this.servicesRepo.findById(serviceId);
        if (!service) throw new NotFoundException(`Serviço ${serviceId} não encontrado`);

        let updatedOrder: ServiceOrder;
        try {
            updatedOrder = order.addService({
                id: crypto.randomUUID(),
                serviceId,
                price: service.price,
            });
        } catch (err: any) {
            throw new ConflictException(err.message);
        }

        await this.orderRepo.addService(serviceOrderId, serviceId, updatedOrder.totalPrice);
        const result = await this.orderRepo.findById(serviceOrderId);
        return result!;
    }
}
