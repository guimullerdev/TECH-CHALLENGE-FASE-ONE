import { ItemOrcamentoServico } from './item-orcamento-servico.entity';

describe('ItemOrcamentoServico', () => {
    describe('create()', () => {
        it('creates with valid props', () => {
            const item = ItemOrcamentoServico.create({ servicoId: 's1', valor: 150 });
            expect(item.servicoId).toBe('s1');
            expect(item.valor).toBe(150);
            expect(item.id).toBeTruthy();
        });

        it('accepts zero valor', () => {
            const item = ItemOrcamentoServico.create({ servicoId: 's1', valor: 0 });
            expect(item.valor).toBe(0);
        });

        it('throws when servicoId is empty', () => {
            expect(() => ItemOrcamentoServico.create({ servicoId: '', valor: 100 })).toThrow('obrigatório');
        });

        it('throws when valor is negative', () => {
            expect(() => ItemOrcamentoServico.create({ servicoId: 's1', valor: -1 })).toThrow('negativo');
        });
    });

    describe('restore()', () => {
        it('restores without validation', () => {
            const item = ItemOrcamentoServico.restore({ id: 'i1', servicoId: 's1', valor: 200 });
            expect(item.id).toBe('i1');
            expect(item.valor).toBe(200);
        });
    });
});
