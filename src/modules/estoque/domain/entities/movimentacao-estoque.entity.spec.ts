import { MovimentacaoEstoque, TipoMovimentacao } from './movimentacao-estoque.entity';

describe('MovimentacaoEstoque entity', () => {
    describe('create()', () => {
        it('creates a movimentacao with correct properties', () => {
            const m = MovimentacaoEstoque.create({ pecaId: 'peca-1', tipo: TipoMovimentacao.ENTRADA, quantidade: 10 });
            expect(m.pecaId).toBe('peca-1');
            expect(m.tipo).toBe(TipoMovimentacao.ENTRADA);
            expect(m.quantidade).toBe(10);
            expect(m.id).toBeDefined();
            expect(m.createdAt).toBeInstanceOf(Date);
        });

        it('accepts optional osId and observacao', () => {
            const m = MovimentacaoEstoque.create({
                pecaId: 'peca-1', tipo: TipoMovimentacao.RESERVA, quantidade: 2,
                osId: 'os-1', observacao: 'Reserva para OS',
            });
            expect(m.osId).toBe('os-1');
            expect(m.observacao).toBe('Reserva para OS');
        });

        it('throws when quantidade <= 0', () => {
            expect(() =>
                MovimentacaoEstoque.create({ pecaId: 'peca-1', tipo: TipoMovimentacao.ENTRADA, quantidade: 0 }),
            ).toThrow('maior que zero');
        });

        it('throws when quantidade is negative', () => {
            expect(() =>
                MovimentacaoEstoque.create({ pecaId: 'peca-1', tipo: TipoMovimentacao.BAIXA, quantidade: -5 }),
            ).toThrow('maior que zero');
        });

        it('creates all tipos correctly', () => {
            const tipos = [TipoMovimentacao.ENTRADA, TipoMovimentacao.BAIXA, TipoMovimentacao.RESERVA, TipoMovimentacao.LIBERACAO_RESERVA];
            for (const tipo of tipos) {
                const m = MovimentacaoEstoque.create({ pecaId: 'p1', tipo, quantidade: 1 });
                expect(m.tipo).toBe(tipo);
            }
        });
    });

    describe('restore()', () => {
        it('restores with a given id and createdAt', () => {
            const date = new Date('2024-01-01');
            const m = MovimentacaoEstoque.restore({
                id: 'mov-1', pecaId: 'peca-1', tipo: TipoMovimentacao.ENTRADA,
                quantidade: 5, createdAt: date,
            });
            expect(m.id).toBe('mov-1');
            expect(m.createdAt).toEqual(date);
        });
    });
});
