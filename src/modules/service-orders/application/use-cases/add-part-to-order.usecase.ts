import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import type { ServiceOrderRepository } from '../../domain/repositories/service-orders.repository.interface';
import type { PartRepository } from 'src/modules/parts/domain/repositories/parts.repository.interface';
import { ServiceOrder } from '../../domain/entities/service-orders.entity';
import { AddPartResponseDto } from '../dto/add-part-response.dto';

@Injectable()
export class AddPartToOrderUseCase {
    constructor(
        @Inject('ServiceOrderRepository')
        private readonly orderRepo: ServiceOrderRepository,
        @Inject('PartRepository')
        private readonly partRepo: PartRepository,
    ) { }

    async execute(serviceOrderId: string, partId: string, quantity: number): Promise<AddPartResponseDto> {
        if (quantity < 1) throw new BadRequestException('Quantidade deve ser >= 1');

        const order = await this.orderRepo.findById(serviceOrderId);
        if (!order) throw new NotFoundException(`Ordem de serviço ${serviceOrderId} não encontrada`);

        const part = await this.partRepo.findById(partId);
        if (!part) throw new NotFoundException(`Peça ${partId} não encontrada`);

        let updatedOrder: ServiceOrder;
        try {
            updatedOrder = order.addPart({
                id: crypto.randomUUID(),
                partId,
                quantity,
                price: part.price,
            });
        } catch (err: any) {
            throw new ConflictException(err.message);
        }

        await this.orderRepo.addPart(serviceOrderId, partId, quantity, updatedOrder.totalPrice);
        const result = await this.orderRepo.findById(serviceOrderId);

        return {
            order: result!,
            stockAvailable: part.stockQty >= quantity,
            stockQty: part.stockQty,
        };
    }
}
