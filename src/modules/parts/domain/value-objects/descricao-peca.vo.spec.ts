import { DescricaoPeca } from './descricao-peca.vo';

describe('DescricaoPeca', () => {
    describe('create()', () => {
        it('accepts valid description', () => {
            expect(DescricaoPeca.create('Filtro de óleo').getValue()).toBe('Filtro de óleo');
        });

        it('trims whitespace', () => {
            expect(DescricaoPeca.create('  Vela  ').getValue()).toBe('Vela');
        });

        it('accepts exactly 3 characters', () => {
            expect(DescricaoPeca.create('abc').getValue()).toBe('abc');
        });

        it('throws when too short (after trim)', () => {
            expect(() => DescricaoPeca.create('ab')).toThrow('ao menos');
        });

        it('throws when too long', () => {
            expect(() => DescricaoPeca.create('a'.repeat(501))).toThrow('exceder');
        });
    });

    describe('restore()', () => {
        it('restores without validation', () => {
            expect(DescricaoPeca.restore('x').getValue()).toBe('x');
        });
    });

    describe('equals()', () => {
        it('returns true for same description', () => {
            expect(DescricaoPeca.create('Pastilha de freio').equals(DescricaoPeca.create('Pastilha de freio'))).toBe(true);
        });

        it('returns false for different descriptions', () => {
            expect(DescricaoPeca.create('Pastilha').equals(DescricaoPeca.create('Correia'))).toBe(false);
        });
    });
});
