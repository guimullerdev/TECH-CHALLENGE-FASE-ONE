import { Inject, Injectable } from "@nestjs/common";

import { CreateServiceOrderDto } from "../dto/create-service-orders.dto";
import { ServiceOrder } from "../../domain/entities/service-orders.entity";
import type { ServiceOrderRepository } from "../../domain/repositories/service-orders.repository.interface";

@Injectable()
export class CreateServiceOrderUseCase {
    constructor(
        @Inject('ServiceOrderRepository')
        private readonly repo: ServiceOrderRepository
    ) { }

    async execute(dto: CreateServiceOrderDto) {
        const serviceOrder = ServiceOrder.create(dto);
        await this.repo.create(serviceOrder);
    }
}