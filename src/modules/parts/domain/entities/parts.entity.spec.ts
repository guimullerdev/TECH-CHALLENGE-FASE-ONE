import { Part } from './parts.entity';

describe('Part entity', () => {
    describe('create()', () => {
        it('creates a part with correct properties', () => {
            const part = Part.create({ name: 'Filtro de óleo', price: 45.9, stockQty: 10 });
            expect(part.name).toBe('Filtro de óleo');
            expect(part.price).toBe(45.9);
            expect(part.stockQty).toBe(10);
            expect(part.id).toBeDefined();
        });

        it('accepts optional description', () => {
            const part = Part.create({ name: 'Filtro', price: 10, stockQty: 5, description: 'Desc' });
            expect(part.description).toBe('Desc');
        });

        it('throws when price is negative', () => {
            expect(() => Part.create({ name: 'X', price: -1, stockQty: 5 })).toThrow('negativo');
        });

        it('throws when stockQty is negative', () => {
            expect(() => Part.create({ name: 'X', price: 10, stockQty: -1 })).toThrow('negativa');
        });

        it('accepts price = 0 and stockQty = 0', () => {
            const part = Part.create({ name: 'X', price: 0, stockQty: 0 });
            expect(part.price).toBe(0);
            expect(part.stockQty).toBe(0);
        });
    });

    describe('restore()', () => {
        it('restores with a given id', () => {
            const part = Part.restore({ id: 'abc', name: 'Filtro', price: 10, stockQty: 5 });
            expect(part.id).toBe('abc');
        });
    });

    describe('update()', () => {
        it('updates name partially', () => {
            const part = Part.create({ name: 'Old', price: 10, stockQty: 5 });
            const updated = part.update({ name: 'New' });
            expect(updated.name).toBe('New');
            expect(updated.price).toBe(10);
        });

        it('throws when updated price is negative', () => {
            const part = Part.create({ name: 'X', price: 10, stockQty: 5 });
            expect(() => part.update({ price: -5 })).toThrow('negativo');
        });

        it('throws when updated stockQty is negative', () => {
            const part = Part.create({ name: 'X', price: 10, stockQty: 5 });
            expect(() => part.update({ stockQty: -1 })).toThrow('negativa');
        });

        it('keeps unchanged fields', () => {
            const part = Part.create({ name: 'X', price: 10, stockQty: 5, description: 'D' });
            const updated = part.update({ price: 20 });
            expect(updated.name).toBe('X');
            expect(updated.stockQty).toBe(5);
            expect(updated.description).toBe('D');
        });
    });
});
