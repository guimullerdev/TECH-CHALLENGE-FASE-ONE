import {
    ServiceOrder,
    ServiceOrderStatus,
    InvalidTransitionError,
    InsufficientStockError,
} from './service-orders.entity';

const baseOrder = () =>
    ServiceOrder.create({
        customerId: 'customer-1',
        vehicleId: 'vehicle-1',
        description: 'Barulho ao frear',
    });

const serviceItem = (serviceId = 'svc-1', price = 100) => ({
    id: 'item-1',
    serviceId,
    price,
});

const partItem = (partId = 'part-1', price = 50, quantity = 2) => ({
    id: 'item-2',
    partId,
    price,
    quantity,
});

describe('ServiceOrder entity', () => {
    describe('create()', () => {
        it('creates with RECEIVED status and totalPrice 0', () => {
            const order = baseOrder();
            expect(order.status).toBe(ServiceOrderStatus.RECEIVED);
            expect(order.totalPrice).toBe(0);
            expect(order.services).toEqual([]);
            expect(order.parts).toEqual([]);
        });

        it('throws when customerId is missing', () => {
            expect(() => ServiceOrder.create({ customerId: '', vehicleId: 'v1', description: 'desc' }))
                .toThrow('customerId');
        });

        it('throws when vehicleId is missing', () => {
            expect(() => ServiceOrder.create({ customerId: 'c1', vehicleId: '', description: 'desc' }))
                .toThrow('vehicleId');
        });

        it('throws when description is missing', () => {
            expect(() => ServiceOrder.create({ customerId: 'c1', vehicleId: 'v1', description: '' }))
                .toThrow('description');
        });
    });

    describe('addService()', () => {
        it('adds a service and recalculates totalPrice', () => {
            const order = baseOrder().addService(serviceItem('svc-1', 100));
            expect(order.services).toHaveLength(1);
            expect(order.totalPrice).toBe(100);
        });

        it('throws on duplicate service', () => {
            const order = baseOrder().addService(serviceItem('svc-1', 100));
            expect(() => order.addService(serviceItem('svc-1', 100))).toThrow('já adicionado');
        });

        it('accumulates totalPrice across multiple services', () => {
            const order = baseOrder()
                .addService(serviceItem('svc-1', 100))
                .addService(serviceItem('svc-2', 200));
            expect(order.totalPrice).toBe(300);
        });
    });

    describe('removeService()', () => {
        it('removes a service and recalculates totalPrice', () => {
            const order = baseOrder()
                .addService(serviceItem('svc-1', 100))
                .addService(serviceItem('svc-2', 200))
                .removeService('svc-1');
            expect(order.services).toHaveLength(1);
            expect(order.totalPrice).toBe(200);
        });

        it('throws when service is not in the OS', () => {
            expect(() => baseOrder().removeService('nonexistent')).toThrow('não encontrado');
        });

        it('totalPrice is 0 when all services removed', () => {
            const order = baseOrder()
                .addService(serviceItem('svc-1', 100))
                .removeService('svc-1');
            expect(order.totalPrice).toBe(0);
        });
    });

    describe('addPart()', () => {
        it('adds a part and recalculates totalPrice with quantity', () => {
            const order = baseOrder().addPart(partItem('part-1', 50, 3));
            expect(order.parts).toHaveLength(1);
            expect(order.totalPrice).toBe(150);
        });

        it('throws when quantity < 1', () => {
            expect(() => baseOrder().addPart(partItem('part-1', 50, 0))).toThrow('Quantidade');
        });

        it('throws on duplicate part', () => {
            const order = baseOrder().addPart(partItem('part-1', 50, 1));
            expect(() => order.addPart(partItem('part-1', 50, 1))).toThrow('já adicionada');
        });
    });

    describe('removePart()', () => {
        it('removes a part and recalculates totalPrice', () => {
            const order = baseOrder()
                .addPart(partItem('part-1', 50, 2))
                .addPart(partItem('part-2', 30, 1))
                .removePart('part-1');
            expect(order.parts).toHaveLength(1);
            expect(order.totalPrice).toBe(30);
        });

        it('throws when part is not in the OS', () => {
            expect(() => baseOrder().removePart('nonexistent')).toThrow('não encontrada');
        });
    });

    describe('recalculateTotalPrice()', () => {
        it('returns 0 for empty lists', () => {
            expect(baseOrder().recalculateTotalPrice([], [])).toBe(0);
        });

        it('sums services + parts × quantity', () => {
            const order = baseOrder();
            const result = order.recalculateTotalPrice(
                [{ id: 'i1', serviceId: 's1', price: 100 }],
                [{ id: 'i2', partId: 'p1', price: 40, quantity: 3 }],
            );
            expect(result).toBe(220);
        });
    });

    describe('startDiagnosis()', () => {
        it('transitions RECEIVED → DIAGNOSING', () => {
            const order = baseOrder().startDiagnosis();
            expect(order.status).toBe(ServiceOrderStatus.DIAGNOSING);
        });

        it('throws InvalidTransitionError when status is not RECEIVED', () => {
            const order = baseOrder().startDiagnosis();
            expect(() => order.startDiagnosis()).toThrow(InvalidTransitionError);
        });
    });

    describe('finishDiagnosis()', () => {
        it('transitions DIAGNOSING → WAITING_APPROVAL and recalculates totalPrice', () => {
            const order = baseOrder()
                .addService(serviceItem('svc-1', 150))
                .startDiagnosis()
                .finishDiagnosis();
            expect(order.status).toBe(ServiceOrderStatus.WAITING_APPROVAL);
            expect(order.totalPrice).toBe(150);
        });

        it('throws InvalidTransitionError when status is not DIAGNOSING', () => {
            expect(() => baseOrder().finishDiagnosis()).toThrow(InvalidTransitionError);
        });
    });

    describe('validateBudget()', () => {
        it('passes when status is WAITING_APPROVAL and totalPrice > 0', () => {
            const order = baseOrder()
                .addService(serviceItem('svc-1', 100))
                .startDiagnosis()
                .finishDiagnosis();
            expect(() => order.validateBudget()).not.toThrow();
        });

        it('throws when status is not WAITING_APPROVAL', () => {
            expect(() => baseOrder().validateBudget()).toThrow(InvalidTransitionError);
        });

        it('throws when totalPrice is 0', () => {
            const order = baseOrder().startDiagnosis().finishDiagnosis();
            expect(() => order.validateBudget()).toThrow('zero');
        });
    });

    describe('approveBudget()', () => {
        it('transitions WAITING_APPROVAL → IN_PROGRESS', () => {
            const order = baseOrder()
                .addService(serviceItem('svc-1', 100))
                .startDiagnosis()
                .finishDiagnosis()
                .approveBudget();
            expect(order.status).toBe(ServiceOrderStatus.IN_PROGRESS);
        });

        it('throws when totalPrice is 0', () => {
            const order = baseOrder().startDiagnosis().finishDiagnosis();
            expect(() => order.approveBudget()).toThrow(InvalidTransitionError);
        });

        it('throws InvalidTransitionError when status is not WAITING_APPROVAL', () => {
            expect(() => baseOrder().approveBudget()).toThrow(InvalidTransitionError);
        });
    });

    describe('rejectBudget()', () => {
        it('transitions WAITING_APPROVAL → RECEIVED', () => {
            const order = baseOrder()
                .addService(serviceItem('svc-1', 100))
                .startDiagnosis()
                .finishDiagnosis()
                .rejectBudget();
            expect(order.status).toBe(ServiceOrderStatus.RECEIVED);
        });

        it('throws InvalidTransitionError when status is not WAITING_APPROVAL', () => {
            expect(() => baseOrder().rejectBudget()).toThrow(InvalidTransitionError);
        });
    });

    describe('finish()', () => {
        it('transitions IN_PROGRESS → FINISHED', () => {
            const order = baseOrder()
                .addService(serviceItem('svc-1', 100))
                .startDiagnosis()
                .finishDiagnosis()
                .approveBudget()
                .finish();
            expect(order.status).toBe(ServiceOrderStatus.FINISHED);
        });

        it('throws InvalidTransitionError when status is not IN_PROGRESS', () => {
            expect(() => baseOrder().finish()).toThrow(InvalidTransitionError);
        });
    });

    describe('deliver()', () => {
        it('transitions FINISHED → DELIVERED', () => {
            const order = baseOrder()
                .addService(serviceItem('svc-1', 100))
                .startDiagnosis()
                .finishDiagnosis()
                .approveBudget()
                .finish()
                .deliver();
            expect(order.status).toBe(ServiceOrderStatus.DELIVERED);
        });

        it('throws InvalidTransitionError when status is not FINISHED', () => {
            expect(() => baseOrder().deliver()).toThrow(InvalidTransitionError);
        });
    });

    describe('full happy-path flow', () => {
        it('RECEIVED → DIAGNOSING → WAITING_APPROVAL → IN_PROGRESS → FINISHED → DELIVERED', () => {
            const statuses: ServiceOrderStatus[] = [];
            let order = baseOrder().addService(serviceItem('svc-1', 100));
            statuses.push(order.status);
            order = order.startDiagnosis(); statuses.push(order.status);
            order = order.finishDiagnosis(); statuses.push(order.status);
            order = order.approveBudget(); statuses.push(order.status);
            order = order.finish(); statuses.push(order.status);
            order = order.deliver(); statuses.push(order.status);
            expect(statuses).toEqual([
                ServiceOrderStatus.RECEIVED,
                ServiceOrderStatus.DIAGNOSING,
                ServiceOrderStatus.WAITING_APPROVAL,
                ServiceOrderStatus.IN_PROGRESS,
                ServiceOrderStatus.FINISHED,
                ServiceOrderStatus.DELIVERED,
            ]);
        });
    });
});

describe('InsufficientStockError', () => {
    it('sets name and message correctly', () => {
        const err = new InsufficientStockError('part-1', 5, 2);
        expect(err.name).toBe('InsufficientStockError');
        expect(err.message).toContain('part-1');
        expect(err.message).toContain('5');
        expect(err.message).toContain('2');
    });
});
