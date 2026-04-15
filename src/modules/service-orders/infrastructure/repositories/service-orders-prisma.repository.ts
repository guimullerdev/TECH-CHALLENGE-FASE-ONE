import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { InsufficientStockError } from '../../domain/entities/service-orders.entity';

import { ServiceOrderRepository } from '../../domain/repositories/service-orders.repository.interface';
import { ServiceOrder, ServiceOrderStatus } from '../../domain/entities/service-orders.entity';
import { ServiceOrderMapper } from '../mappers/service-orders.mapper';
import { PrismaService } from 'src/prisma/prisma.service';

const includeItems = {
    services: { include: { service: true } },
    parts: { include: { part: true } },
} as const;

@Injectable()
export class ServiceOrderPrismaRepository implements ServiceOrderRepository {
    constructor(private prisma: PrismaService) { }

    async findById(id: string): Promise<ServiceOrder | null> {
        const raw = await this.prisma.serviceOrder.findUnique({
            where: { id },
            include: includeItems,
        });
        if (!raw) return null;
        return ServiceOrderMapper.toDomain(raw);
    }

    async findAll(status?: ServiceOrderStatus): Promise<ServiceOrder[]> {
        const raws = await this.prisma.serviceOrder.findMany({
            where: status ? { status: status as unknown as any } : undefined,
            include: includeItems,
            orderBy: { createdAt: 'desc' },
        });
        return raws.map(ServiceOrderMapper.toDomain);
    }

    async create(serviceOrder: ServiceOrder): Promise<ServiceOrder> {
        const raw = await this.prisma.serviceOrder.create({
            data: ServiceOrderMapper.toPrisma(serviceOrder),
            include: includeItems,
        });
        return ServiceOrderMapper.toDomain(raw);
    }

    async save(serviceOrder: ServiceOrder): Promise<ServiceOrder> {
        const raw = await this.prisma.serviceOrder.update({
            where: { id: serviceOrder.id },
            data: {
                description: serviceOrder.description,
                status: serviceOrder.status as unknown as any,
                totalPrice: new Prisma.Decimal(serviceOrder.totalPrice),
                updatedAt: serviceOrder.updatedAt,
            },
            include: includeItems,
        });
        return ServiceOrderMapper.toDomain(raw);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.$transaction([
            this.prisma.orderService.deleteMany({ where: { serviceOrderId: id } }),
            this.prisma.orderPart.deleteMany({ where: { serviceOrderId: id } }),
            this.prisma.serviceOrder.delete({ where: { id } }),
        ]);
    }

    async addService(
        serviceOrderId: string,
        serviceId: string,
        newTotalPrice: number,
    ): Promise<void> {
        await this.prisma.$transaction([
            this.prisma.orderService.create({
                data: { id: crypto.randomUUID(), serviceOrderId, serviceId },
            }),
            this.prisma.serviceOrder.update({
                where: { id: serviceOrderId },
                data: { totalPrice: new Prisma.Decimal(newTotalPrice), updatedAt: new Date() },
            }),
        ]);
    }

    async removeService(
        serviceOrderId: string,
        serviceId: string,
        newTotalPrice: number,
    ): Promise<void> {
        await this.prisma.$transaction([
            this.prisma.orderService.deleteMany({ where: { serviceOrderId, serviceId } }),
            this.prisma.serviceOrder.update({
                where: { id: serviceOrderId },
                data: { totalPrice: new Prisma.Decimal(newTotalPrice), updatedAt: new Date() },
            }),
        ]);
    }

    async addPart(
        serviceOrderId: string,
        partId: string,
        quantity: number,
        newTotalPrice: number,
    ): Promise<void> {
        await this.prisma.$transaction([
            this.prisma.orderPart.create({
                data: { id: crypto.randomUUID(), serviceOrderId, partId, quantity },
            }),
            this.prisma.serviceOrder.update({
                where: { id: serviceOrderId },
                data: { totalPrice: new Prisma.Decimal(newTotalPrice), updatedAt: new Date() },
            }),
        ]);
    }

    async removePart(
        serviceOrderId: string,
        partId: string,
        newTotalPrice: number,
    ): Promise<void> {
        await this.prisma.$transaction([
            this.prisma.orderPart.deleteMany({ where: { serviceOrderId, partId } }),
            this.prisma.serviceOrder.update({
                where: { id: serviceOrderId },
                data: { totalPrice: new Prisma.Decimal(newTotalPrice), updatedAt: new Date() },
            }),
        ]);
    }

    async reserveStockAndApprove(serviceOrder: ServiceOrder): Promise<ServiceOrder> {
        const raw = await this.prisma.$transaction(async (tx) => {
            // 1. Validate and decrement stock for every part atomically.
            for (const item of serviceOrder.parts) {
                const part = await tx.part.findUnique({ where: { id: item.partId } });
                if (!part) {
                    throw new InsufficientStockError(item.partId, item.quantity, 0);
                }
                if (part.stockQty < item.quantity) {
                    throw new InsufficientStockError(item.partId, item.quantity, part.stockQty);
                }
                await tx.part.update({
                    where: { id: item.partId },
                    data: { stockQty: { decrement: item.quantity } },
                });
            }

            // 2. Transition ServiceOrder to IN_PROGRESS.
            return tx.serviceOrder.update({
                where: { id: serviceOrder.id },
                data: {
                    status: serviceOrder.status as unknown as any,
                    updatedAt: serviceOrder.updatedAt,
                },
                include: includeItems,
            });
        });

        return ServiceOrderMapper.toDomain(raw);
    }
}
