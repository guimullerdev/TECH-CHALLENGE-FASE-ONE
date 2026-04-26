import { Telefone } from './telefone.vo';

describe('Telefone', () => {
    describe('create()', () => {
        it('accepts 10-digit phone (fixo)', () => {
            expect(Telefone.create('1133334444').getValue()).toBe('1133334444');
        });

        it('accepts 11-digit phone (celular)', () => {
            expect(Telefone.create('11999990000').getValue()).toBe('11999990000');
        });

        it('strips formatting', () => {
            expect(Telefone.create('(11) 9 9999-0000').getValue()).toBe('11999990000');
        });

        it('throws when too short', () => {
            expect(() => Telefone.create('123456789')).toThrow('10 ou 11');
        });

        it('throws when too long', () => {
            expect(() => Telefone.create('119999900001')).toThrow('10 ou 11');
        });
    });

    describe('restore()', () => {
        it('restores without validation', () => {
            expect(Telefone.restore('999').getValue()).toBe('999');
        });
    });

    describe('equals()', () => {
        it('returns true for same number', () => {
            expect(Telefone.create('11999990000').equals(Telefone.create('11999990000'))).toBe(true);
        });

        it('returns false for different numbers', () => {
            expect(Telefone.create('11999990000').equals(Telefone.create('11988880000'))).toBe(false);
        });
    });
});
