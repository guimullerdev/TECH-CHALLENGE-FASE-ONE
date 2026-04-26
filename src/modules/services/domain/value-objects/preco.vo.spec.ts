import { Preco } from './preco.vo';

describe('Preco (services)', () => {
    describe('create()', () => {
        it('creates with zero', () => {
            expect(Preco.create(0).getValue()).toBe(0);
        });

        it('creates with positive value', () => {
            expect(Preco.create(99.99).getValue()).toBe(99.99);
        });

        it('rounds to 2 decimal places', () => {
            expect(Preco.create(10.999).getValue()).toBe(11);
        });

        it('throws when negative', () => {
            expect(() => Preco.create(-0.01)).toThrow('negativo');
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
            expect(Preco.create(10.50).add(Preco.create(5.50)).getValue()).toBe(16);
        });
    });

    describe('multiply()', () => {
        it('multiplies by factor', () => {
            expect(Preco.create(10).multiply(3).getValue()).toBe(30);
        });

        it('rounds result to 2 decimals', () => {
            expect(Preco.create(10).multiply(1.005).getValue()).toBe(10.05);
        });
    });

    describe('equals()', () => {
        it('returns true for same value', () => {
            expect(Preco.create(50).equals(Preco.create(50))).toBe(true);
        });

        it('returns false for different values', () => {
            expect(Preco.create(50).equals(Preco.create(51))).toBe(false);
        });
    });
});
