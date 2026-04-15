import { Prisma, OrderStatus } from '@prisma/client';
import {
    ServiceOrder,
    ServiceOrderStatus,
    ServiceOrderServiceItem,
    ServiceOrderPartItem,
} from '../../domain/entities/service-orders.entity';

type PrismaServiceOrderFull = {
    id: string;
    customerId: string;
    vehicleId: string;
    status: OrderStatus;
    description: string;
    totalPrice: Prisma.Decimal;
    createdAt: Date;
    updatedAt: Date;
    services?: Array<{ id: string; serviceId: string; service: { price: Prisma.Decimal } }>;
    parts?: Array<{ id: string; partId: string; quantity: number; part: { price: Prisma.Decimal } }>;
};

export class ServiceOrderMapper {
    static toDomain(raw: PrismaServiceOrderFull): ServiceOrder {
        const services: ServiceOrderServiceItem[] = (raw.services ?? []).map(s => ({
            id: s.id,
            serviceId: s.serviceId,
            price: Number(s.service.price),
        }));

        const parts: ServiceOrderPartItem[] = (raw.parts ?? []).map(p => ({
            id: p.id,
            partId: p.partId,
            quantity: p.quantity,
            price: Number(p.part.price),
        }));

        return ServiceOrder.restore({
            id: raw.id,
            customerId: raw.customerId,
            vehicleId: raw.vehicleId,
            status: raw.status as unknown as ServiceOrderStatus,
            description: raw.description,
            totalPrice: Number(raw.totalPrice),
            services,
            parts,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }

    static toPrisma(serviceOrder: ServiceOrder) {
        return {
            id: serviceOrder.id,
            customerId: serviceOrder.customerId,
            vehicleId: serviceOrder.vehicleId,
            status: serviceOrder.status as unknown as OrderStatus,
            description: serviceOrder.description,
            totalPrice: new Prisma.Decimal(serviceOrder.totalPrice),
            createdAt: serviceOrder.createdAt,
            updatedAt: serviceOrder.updatedAt,
        };
    }
}
