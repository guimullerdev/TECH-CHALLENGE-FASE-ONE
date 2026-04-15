import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import type { ServiceOrderRepository } from '../../domain/repositories/service-orders.repository.interface';
import { ServiceOrder } from '../../domain/entities/service-orders.entity';
import { UpdateServiceOrderDto } from '../dto/update-service-orders.dto';

@Injectable()
export class UpdateServiceOrderUseCase {
    constructor(
        @Inject('ServiceOrderRepository')
        private readonly repo: ServiceOrderRepository,
    ) { }

    async execute(id: string, dto: UpdateServiceOrderDto): Promise<ServiceOrder> {
        const order = await this.repo.findById(id);
        if (!order) throw new NotFoundException(`Ordem de serviço ${id} não encontrada`);
        const updated = order.update({ description: dto.description });
        return this.repo.save(updated);
    }
}
