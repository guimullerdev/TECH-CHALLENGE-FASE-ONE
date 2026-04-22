import { MovimentacaoEstoqueMapper } from './movimentacao-estoque.mapper';
import { MovimentacaoEstoque, TipoMovimentacao } from '../../domain/entities/movimentacao-estoque.entity';

const rawMov = {
    id: 'mov-1',
    pecaId: 'p-1',
    tipo: 'ENTRADA',
    quantidade: 10,
    osId: 'os-1',
    observacao: 'Observação teste',
    createdAt: new Date('2024-01-01'),
};

describe('MovimentacaoEstoqueMapper', () => {
    describe('toDomain()', () => {
        it('maps all fields correctly', () => {
            const mov = MovimentacaoEstoqueMapper.toDomain(rawMov as any);
            expect(mov.id).toBe('mov-1');
            expect(mov.pecaId).toBe('p-1');
            expect(mov.tipo).toBe(TipoMovimentacao.ENTRADA);
            expect(mov.quantidade).toBe(10);
            expect(mov.osId).toBe('os-1');
            expect(mov.observacao).toBe('Observação teste');
        });

        it('converts null optional fields to undefined', () => {
            const mov = MovimentacaoEstoqueMapper.toDomain({ ...rawMov, osId: null, observacao: null } as any);
            expect(mov.osId).toBeUndefined();
            expect(mov.observacao).toBeUndefined();
        });
    });

    describe('toPrisma()', () => {
        it('maps domain to prisma shape', () => {
            const mov = MovimentacaoEstoque.restore({ ...rawMov, tipo: TipoMovimentacao.ENTRADA });
            const prisma = MovimentacaoEstoqueMapper.toPrisma(mov);
            expect(prisma.id).toBe('mov-1');
            expect(prisma.pecaId).toBe('p-1');
            expect(prisma.tipo).toBe('ENTRADA');
            expect(prisma.quantidade).toBe(10);
            expect(prisma.osId).toBe('os-1');
        });

        it('converts undefined optional fields to null', () => {
            const mov = MovimentacaoEstoque.restore({ ...rawMov, tipo: TipoMovimentacao.BAIXA, osId: undefined, observacao: undefined });
            const prisma = MovimentacaoEstoqueMapper.toPrisma(mov);
            expect(prisma.osId).toBeNull();
            expect(prisma.observacao).toBeNull();
        });
    });
});
