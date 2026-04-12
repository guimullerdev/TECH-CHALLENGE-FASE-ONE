import { Prisma, ServiceOrder as PrismaServiceOrder, OrderStatus } from '@prisma/client';
import { ServiceOrder, ServiceOrderStatus } from '../../domain/entities/service-orders.entity';

export class ServiceOrderMapper {
    static toDomain(raw: PrismaServiceOrder): ServiceOrder {
        return ServiceOrder.restore({
            id: raw.id,
            customerId: raw.customerId,
            vehicleId: raw.vehicleId,
            status: raw.status as unknown as ServiceOrderStatus,
            description: raw.description,
            totalPrice: Number(raw.totalPrice),
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }

    static toPrisma(serviceOrder: ServiceOrder): PrismaServiceOrder {
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