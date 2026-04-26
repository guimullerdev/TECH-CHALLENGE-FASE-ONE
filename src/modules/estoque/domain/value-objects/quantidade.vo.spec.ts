import { Quantidade } from './quantidade.vo';

describe('Quantidade', () => {
    describe('create()', () => {
        it('creates with zero', () => {
            expect(Quantidade.create(0).getValue()).toBe(0);
        });

        it('creates with positive integer', () => {
            expect(Quantidade.create(5).getValue()).toBe(5);
        });

        it('throws when negative', () => {
            expect(() => Quantidade.create(-1)).toThrow('negativa');
        });

        it('throws when not integer', () => {
            expect(() => Quantidade.create(1.5)).toThrow('inteiro');
        });
    });

    describe('createPositivo()', () => {
        it('creates with positive integer', () => {
            expect(Quantidade.createPositivo(3).getValue()).toBe(3);
        });

        it('throws when zero', () => {
            expect(() => Quantidade.createPositivo(0)).toThrow('>= 1');
        });

        it('throws when negative', () => {
            expect(() => Quantidade.createPositivo(-1)).toThrow('>= 1');
        });
    });

    describe('restore()', () => {
        it('restores without validation', () => {
            expect(Quantidade.restore(999).getValue()).toBe(999);
        });
    });

    describe('subtract()', () => {
        it('subtracts correctly', () => {
            const result = Quantidade.create(10).subtract(Quantidade.create(3));
            expect(result.getValue()).toBe(7);
        });

        it('throws when result would be negative', () => {
            expect(() => Quantidade.create(2).subtract(Quantidade.create(5))).toThrow('negativa');
        });
    });

    describe('add()', () => {
        it('adds correctly', () => {
            const result = Quantidade.create(3).add(Quantidade.create(7));
            expect(result.getValue()).toBe(10);
        });
    });

    describe('isEnough()', () => {
        it('returns true when sufficient', () => {
            expect(Quantidade.create(10).isEnough(Quantidade.create(5))).toBe(true);
        });

        it('returns true when exactly equal', () => {
            expect(Quantidade.create(5).isEnough(Quantidade.create(5))).toBe(true);
        });

        it('returns false when insufficient', () => {
            expect(Quantidade.create(3).isEnough(Quantidade.create(5))).toBe(false);
        });
    });

    describe('equals()', () => {
        it('returns true for same value', () => {
            expect(Quantidade.create(5).equals(Quantidade.create(5))).toBe(true);
        });

        it('returns false for different values', () => {
            expect(Quantidade.create(5).equals(Quantidade.create(6))).toBe(false);
        });
    });
});
