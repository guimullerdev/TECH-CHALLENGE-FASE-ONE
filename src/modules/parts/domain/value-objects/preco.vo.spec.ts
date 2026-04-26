import { Preco } from './preco.vo';

describe('Preco (parts)', () => {
    describe('create()', () => {
        it('creates with zero', () => {
            expect(Preco.create(0).getValue()).toBe(0);
        });

        it('creates with positive value', () => {
            expect(Preco.create(49.99).getValue()).toBe(49.99);
        });

        it('rounds to 2 decimal places', () => {
            expect(Preco.create(10.999).getValue()).toBe(11);
        });

        it('throws when negative', () => {
            expect(() => Preco.create(-1)).toThrow('negativo');
        });

        it('throws when Infinity', () => {
            expect(() => Preco.create(Infinity)).toThrow('finito');
        });
    });

    describe('restore()', () => {
        it('restores without validation', () => {
            expect(Preco.restore(999).getValue()).toBe(999);
        });
    });

    describe('add()', () => {
        it('adds two values', () => {
            expect(Preco.create(3.33).add(Preco.create(6.67)).getValue()).toBe(10);
        });
    });

    describe('multiply()', () => {
        it('multiplies by factor', () => {
            expect(Preco.create(20).multiply(2).getValue()).toBe(40);
        });
    });

    describe('equals()', () => {
        it('returns true for same value', () => {
            expect(Preco.create(100).equals(Preco.create(100))).toBe(true);
        });

        it('returns false for different values', () => {
            expect(Preco.create(100).equals(Preco.create(200))).toBe(false);
        });
    });
});
