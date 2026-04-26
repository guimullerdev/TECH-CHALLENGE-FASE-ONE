import { ItemOrcamentoPeca } from './item-orcamento-peca.entity';

describe('ItemOrcamentoPeca', () => {
    describe('create()', () => {
        it('creates with valid props', () => {
            const item = ItemOrcamentoPeca.create({ pecaId: 'p1', quantidade: 2, valorUnitario: 50 });
            expect(item.pecaId).toBe('p1');
            expect(item.quantidade).toBe(2);
            expect(item.valorUnitario).toBe(50);
            expect(item.valorTotal).toBe(100);
            expect(item.id).toBeTruthy();
        });

        it('computes valorTotal with decimals', () => {
            const item = ItemOrcamentoPeca.create({ pecaId: 'p1', quantidade: 3, valorUnitario: 10.99 });
            expect(item.valorTotal).toBe(32.97);
        });

        it('throws when pecaId is empty', () => {
            expect(() => ItemOrcamentoPeca.create({ pecaId: '', quantidade: 1, valorUnitario: 50 })).toThrow('obrigatório');
        });

        it('throws when quantidade < 1', () => {
            expect(() => ItemOrcamentoPeca.create({ pecaId: 'p1', quantidade: 0, valorUnitario: 50 })).toThrow('>= 1');
        });

        it('throws when valorUnitario is negative', () => {
            expect(() => ItemOrcamentoPeca.create({ pecaId: 'p1', quantidade: 1, valorUnitario: -1 })).toThrow('negativo');
        });
    });

    describe('restore()', () => {
        it('restores without validation', () => {
            const item = ItemOrcamentoPeca.restore({ id: 'i1', pecaId: 'p1', quantidade: 5, valorUnitario: 20 });
            expect(item.id).toBe('i1');
            expect(item.valorTotal).toBe(100);
        });
    });
});
