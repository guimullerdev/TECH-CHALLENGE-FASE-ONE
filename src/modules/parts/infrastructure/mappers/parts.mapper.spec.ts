import { PecaMapper } from './parts.mapper';
import { Peca } from '../../domain/entities/parts.entity';

const rawPeca = {
    id: 'p-1',
    nome: 'Filtro de óleo',
    precoUnitario: 25 as any,
    qtdTotal: 10,
    qtdDisponivel: 10,
    qtdReservada: 0,
    codigo: 'FO-001',
    descricao: 'Filtro padrão',
    ativo: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02'),
};

describe('PecaMapper', () => {
    describe('toDomain()', () => {
        it('maps all fields correctly', () => {
            const peca = PecaMapper.toDomain(rawPeca as any);
            expect(peca.id).toBe('p-1');
            expect(peca.nome).toBe('Filtro de óleo');
            expect(peca.precoUnitario).toBe(25);
            expect(peca.qtdTotal).toBe(10);
            expect(peca.qtdDisponivel).toBe(10);
            expect(peca.qtdReservada).toBe(0);
            expect(peca.codigo).toBe('FO-001');
            expect(peca.ativo).toBe(true);
        });

        it('converts null optional fields to undefined', () => {
            const peca = PecaMapper.toDomain({ ...rawPeca, codigo: null, descricao: null } as any);
            expect(peca.codigo).toBeUndefined();
            expect(peca.descricao).toBeUndefined();
        });
    });

    describe('toPrisma()', () => {
        it('maps domain to prisma shape', () => {
            const peca = Peca.restore({ ...rawPeca, precoUnitario: 25 });
            const prisma = PecaMapper.toPrisma(peca);
            expect(prisma.id).toBe('p-1');
            expect(prisma.nome).toBe('Filtro de óleo');
            expect(prisma.qtdTotal).toBe(10);
            expect(prisma.codigo).toBe('FO-001');
            expect(prisma.ativo).toBe(true);
        });

        it('converts undefined optional fields to null', () => {
            const peca = Peca.restore({ ...rawPeca, precoUnitario: 25, codigo: undefined, descricao: undefined });
            const prisma = PecaMapper.toPrisma(peca);
            expect(prisma.codigo).toBeNull();
            expect(prisma.descricao).toBeNull();
        });
    });
});
