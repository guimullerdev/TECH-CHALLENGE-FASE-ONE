import { Dinheiro } from './dinheiro.vo';

describe('Dinheiro', () => {
    describe('create()', () => {
        it('creates with valid positive value', () => {
            const d = Dinheiro.create(100.50);
            expect(d.getValue()).toBe(100.50);
        });

        it('creates with zero', () => {
            const d = Dinheiro.create(0);
            expect(d.getValue()).toBe(0);
        });

        it('rounds to 2 decimal places', () => {
            const d = Dinheiro.create(10.999);
            expect(d.getValue()).toBe(11);
        });

        it('throws when value is negative', () => {
            expect(() => Dinheiro.create(-1)).toThrow('negativo');
        });

        it('throws when value is Infinity', () => {
            expect(() => Dinheiro.create(Infinity)).toThrow('finito');
        });
    });

    describe('restore()', () => {
        it('restores without validation', () => {
            expect(Dinheiro.restore(999).getValue()).toBe(999);
        });
    });

    describe('add()', () => {
        it('adds two values correctly', () => {
            const a = Dinheiro.create(10.50);
            const b = Dinheiro.create(5.50);
            expect(a.add(b).getValue()).toBe(16);
        });
    });

    describe('isZero()', () => {
        it('returns true for zero', () => {
            expect(Dinheiro.create(0).isZero()).toBe(true);
        });

        it('returns false for non-zero', () => {
            expect(Dinheiro.create(0.01).isZero()).toBe(false);
        });
    });

    describe('equals()', () => {
        it('returns true for same value', () => {
            expect(Dinheiro.create(50).equals(Dinheiro.create(50))).toBe(true);
        });

        it('returns false for different values', () => {
            expect(Dinheiro.create(50).equals(Dinheiro.create(51))).toBe(false);
        });
    });
});
