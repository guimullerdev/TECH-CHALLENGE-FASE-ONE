import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import type { ServiceOrderRepository } from '../../domain/repositories/service-orders.repository.interface';
import { ServiceOrder, ServiceOrderStatus } from '../../domain/entities/service-orders.entity';

@Injectable()
export class GetServiceOrderUseCase {
    constructor(
        @Inject('ServiceOrderRepository')
        private readonly repo: ServiceOrderRepository,
    ) { }

    async execute(id: string): Promise<ServiceOrder> {
        const order = await this.repo.findById(id);
        if (!order) throw new NotFoundException(`Ordem de serviço ${id} não encontrada`);
        return order;
    }

    async executeAll(status?: ServiceOrderStatus): Promise<ServiceOrder[]> {
        return this.repo.findAll(status);
    }
}
