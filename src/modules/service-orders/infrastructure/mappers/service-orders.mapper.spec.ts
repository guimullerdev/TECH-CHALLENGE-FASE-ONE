import { Prisma } from '@prisma/client';
import { ServiceOrderMapper } from './service-orders.mapper';
import { ServiceOrderStatus } from '../../domain/entities/service-orders.entity';

const baseRaw = {
    id: 'order-1',
    customerId: 'customer-1',
    vehicleId: 'vehicle-1',
    status: 'RECEIVED' as const,
    description: 'Barulho ao frear',
    totalPrice: new Prisma.Decimal('250.00'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02'),
};

describe('ServiceOrderMapper', () => {
    describe('toDomain()', () => {
        it('maps basic fields correctly', () => {
            const order = ServiceOrderMapper.toDomain({ ...baseRaw, services: [], parts: [] });
            expect(order.id).toBe('order-1');
            expect(order.customerId).toBe('customer-1');
            expect(order.vehicleId).toBe('vehicle-1');
            expect(order.description).toBe('Barulho ao frear');
            expect(order.totalPrice).toBe(250);
            expect(order.status).toBe(ServiceOrderStatus.RECEIVED);
            expect(order.createdAt).toEqual(new Date('2024-01-01'));
        });

        it('maps services with price from nested relation', () => {
            const raw = {
                ...baseRaw,
                services: [{ id: 'os-1', serviceId: 'svc-1', service: { price: new Prisma.Decimal('100.00') } }],
                parts: [],
            };
            const order = ServiceOrderMapper.toDomain(raw);
            expect(order.services).toHaveLength(1);
            expect(order.services[0].serviceId).toBe('svc-1');
            expect(order.services[0].price).toBe(100);
        });

        it('maps parts with price and quantity from nested relation', () => {
            const raw = {
                ...baseRaw,
                services: [],
                parts: [{ id: 'op-1', partId: 'part-1', quantity: 3, part: { price: new Prisma.Decimal('50.00') } }],
            };
            const order = ServiceOrderMapper.toDomain(raw);
            expect(order.parts).toHaveLength(1);
            expect(order.parts[0].partId).toBe('part-1');
            expect(order.parts[0].quantity).toBe(3);
            expect(order.parts[0].price).toBe(50);
        });

        it('uses empty arrays when services/parts are undefined', () => {
            const order = ServiceOrderMapper.toDomain(baseRaw as any);
            expect(order.services).toEqual([]);
            expect(order.parts).toEqual([]);
        });
    });

    describe('toPrisma()', () => {
        it('converts totalPrice to Prisma Decimal', () => {
            const order = ServiceOrderMapper.toDomain({ ...baseRaw, services: [], parts: [] });
            const prisma = ServiceOrderMapper.toPrisma(order);
            expect(prisma.totalPrice).toBeInstanceOf(Prisma.Decimal);
            expect(Number(prisma.totalPrice)).toBe(250);
        });

        it('preserves all basic fields', () => {
            const order = ServiceOrderMapper.toDomain({ ...baseRaw, services: [], parts: [] });
            const prisma = ServiceOrderMapper.toPrisma(order);
            expect(prisma.id).toBe('order-1');
            expect(prisma.customerId).toBe('customer-1');
            expect(prisma.vehicleId).toBe('vehicle-1');
            expect(prisma.description).toBe('Barulho ao frear');
        });
    });
});
