import { Injectable } from "@nestjs/common";

import { ServiceOrderRepository } from "../../domain/repositories/service-orders.repository.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { ServiceOrderMapper } from "../mappers/service-orders.mapper";
import { ServiceOrder } from "../../domain/entities/service-orders.entity";

@Injectable()
export class ServiceOrderPrismaRepository implements ServiceOrderRepository {
    constructor(private prisma: PrismaService) { }

    async findById(id: string): Promise<ServiceOrder | null> {
        const raw = await this.prisma.serviceOrder.findUnique({ where: { id } });
        if (!raw) return null;
        return ServiceOrderMapper.toDomain(raw);
    }

    async create(serviceOrder: ServiceOrder): Promise<void> {
        const data = ServiceOrderMapper.toPrisma(serviceOrder);
        await this.prisma.serviceOrder.create({ data });
    }
}