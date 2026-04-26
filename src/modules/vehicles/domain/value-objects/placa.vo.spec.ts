import { Placa } from './placa.vo';

describe('Placa', () => {
    describe('create()', () => {
        it('accepts old format ABC-1234', () => {
            expect(Placa.create('ABC-1234').getValue()).toBe('ABC1234');
        });

        it('accepts old format without dash', () => {
            expect(Placa.create('ABC1234').getValue()).toBe('ABC1234');
        });

        it('accepts Mercosul format ABC1D23', () => {
            expect(Placa.create('ABC1D23').getValue()).toBe('ABC1D23');
        });

        it('normalizes to uppercase', () => {
            expect(Placa.create('abc1234').getValue()).toBe('ABC1234');
        });

        it('strips spaces', () => {
            expect(Placa.create('ABC 1234').getValue()).toBe('ABC1234');
        });

        it('throws for invalid format', () => {
            expect(() => Placa.create('INVALID')).toThrow('inválida');
        });

        it('throws for too short', () => {
            expect(() => Placa.create('AB123')).toThrow('inválida');
        });

        it('throws for Mercosul 8 chars', () => {
            expect(() => Placa.create('ABC1D234')).toThrow('inválida');
        });
    });

    describe('restore()', () => {
        it('restores without validation', () => {
            expect(Placa.restore('INVALID').getValue()).toBe('INVALID');
        });

        it('strips dash on restore', () => {
            expect(Placa.restore('ABC-1234').getValue()).toBe('ABC1234');
        });
    });

    describe('equals()', () => {
        it('returns true for same plate', () => {
            expect(Placa.create('ABC1234').equals(Placa.create('ABC1234'))).toBe(true);
        });

        it('returns false for different plates', () => {
            expect(Placa.create('ABC1234').equals(Placa.create('XYZ9999'))).toBe(false);
        });
    });
});
