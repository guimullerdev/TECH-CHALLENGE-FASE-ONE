import { AnoFabricacao } from './ano-fabricacao.vo';

describe('AnoFabricacao', () => {
    const currentYear = new Date().getFullYear();

    describe('create()', () => {
        it('accepts 1886 (first car year)', () => {
            expect(AnoFabricacao.create(1886).getValue()).toBe(1886);
        });

        it('accepts current year', () => {
            expect(AnoFabricacao.create(currentYear).getValue()).toBe(currentYear);
        });

        it('accepts next year', () => {
            expect(AnoFabricacao.create(currentYear + 1).getValue()).toBe(currentYear + 1);
        });

        it('throws when before 1886', () => {
            expect(() => AnoFabricacao.create(1885)).toThrow('inválido');
        });

        it('throws when after next year', () => {
            expect(() => AnoFabricacao.create(currentYear + 2)).toThrow('inválido');
        });

        it('throws when not integer', () => {
            expect(() => AnoFabricacao.create(2020.5)).toThrow('inválido');
        });
    });

    describe('restore()', () => {
        it('restores without validation', () => {
            expect(AnoFabricacao.restore(1000).getValue()).toBe(1000);
        });
    });

    describe('equals()', () => {
        it('returns true for same year', () => {
            expect(AnoFabricacao.create(2020).equals(AnoFabricacao.create(2020))).toBe(true);
        });

        it('returns false for different years', () => {
            expect(AnoFabricacao.create(2020).equals(AnoFabricacao.create(2021))).toBe(false);
        });
    });
});
