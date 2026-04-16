import { Services } from './services.entity';

describe('Services entity', () => {
    describe('create()', () => {
        it('creates a service with correct properties', () => {
            const svc = Services.create({ name: 'Troca de óleo', price: 150, estimatedTime: 30 });
            expect(svc.name).toBe('Troca de óleo');
            expect(svc.price).toBe(150);
            expect(svc.estimatedTime).toBe(30);
            expect(svc.id).toBeDefined();
        });

        it('accepts optional description', () => {
            const svc = Services.create({ name: 'X', price: 10, estimatedTime: 10, description: 'Desc' });
            expect(svc.description).toBe('Desc');
        });

        it('throws when price is negative', () => {
            expect(() => Services.create({ name: 'X', price: -1, estimatedTime: 10 })).toThrow('negativo');
        });

        it('throws when estimatedTime < 1', () => {
            expect(() => Services.create({ name: 'X', price: 10, estimatedTime: 0 })).toThrow('1 minuto');
        });

        it('accepts price = 0 and estimatedTime = 1', () => {
            const svc = Services.create({ name: 'X', price: 0, estimatedTime: 1 });
            expect(svc.price).toBe(0);
            expect(svc.estimatedTime).toBe(1);
        });
    });

    describe('restore()', () => {
        it('restores with a given id', () => {
            const svc = Services.restore({ id: 'svc-1', name: 'X', price: 10, estimatedTime: 10 });
            expect(svc.id).toBe('svc-1');
        });
    });

    describe('update()', () => {
        it('updates fields partially', () => {
            const svc = Services.create({ name: 'Old', price: 100, estimatedTime: 30 });
            const updated = svc.update({ name: 'New', price: 200 });
            expect(updated.name).toBe('New');
            expect(updated.price).toBe(200);
            expect(updated.estimatedTime).toBe(30);
        });

        it('throws when updated price is negative', () => {
            const svc = Services.create({ name: 'X', price: 10, estimatedTime: 10 });
            expect(() => svc.update({ price: -1 })).toThrow('negativo');
        });

        it('throws when updated estimatedTime < 1', () => {
            const svc = Services.create({ name: 'X', price: 10, estimatedTime: 10 });
            expect(() => svc.update({ estimatedTime: 0 })).toThrow('1 minuto');
        });
    });
});
