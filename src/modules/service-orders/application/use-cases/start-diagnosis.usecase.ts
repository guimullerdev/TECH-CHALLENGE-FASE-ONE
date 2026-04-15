import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import type { ServiceOrderRepository } from '../../domain/repositories/service-orders.repository.interface';
import { InvalidTransitionError, ServiceOrder } from '../../domain/entities/service-orders.entity';

@Injectable()
export class StartDiagnosisUseCase {
    constructor(
        @Inject('ServiceOrderRepository')
        private readonly repo: ServiceOrderRepository,
    ) { }

    async execute(id: string): Promise<ServiceOrder> {
        const order = await this.repo.findById(id);
        if (!order) throw new NotFoundException(`Ordem de serviço ${id} não encontrada`);

        let updated: ServiceOrder;
        try {
            updated = order.startDiagnosis();
        } catch (err) {
            if (err instanceof InvalidTransitionError) throw new UnprocessableEntityException(err.message);
            throw err;
        }

        return this.repo.save(updated);
    }
}
