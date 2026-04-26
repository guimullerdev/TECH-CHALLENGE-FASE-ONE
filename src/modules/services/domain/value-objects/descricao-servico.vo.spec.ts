import { DescricaoServico } from './descricao-servico.vo';

describe('DescricaoServico', () => {
    describe('create()', () => {
        it('accepts valid description', () => {
            expect(DescricaoServico.create('Troca de óleo').getValue()).toBe('Troca de óleo');
        });

        it('trims whitespace', () => {
            expect(DescricaoServico.create('  Alinhamento  ').getValue()).toBe('Alinhamento');
        });

        it('accepts exactly 3 characters', () => {
            expect(DescricaoServico.create('abc').getValue()).toBe('abc');
        });

        it('throws when too short (after trim)', () => {
            expect(() => DescricaoServico.create('ab')).toThrow('ao menos');
        });

        it('throws when too long', () => {
            expect(() => DescricaoServico.create('a'.repeat(501))).toThrow('exceder');
        });
    });

    describe('restore()', () => {
        it('restores without validation', () => {
            expect(DescricaoServico.restore('x').getValue()).toBe('x');
        });
    });

    describe('equals()', () => {
        it('returns true for same description', () => {
            expect(DescricaoServico.create('Balanceamento').equals(DescricaoServico.create('Balanceamento'))).toBe(true);
        });

        it('returns false for different descriptions', () => {
            expect(DescricaoServico.create('Alinhamento').equals(DescricaoServico.create('Balanceamento'))).toBe(false);
        });
    });
});
