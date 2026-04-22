import { ServicoMapper } from './services.mapper';
import { Servico } from '../../domain/entities/services.entity';

const rawServico = {
    id: 's-1',
    nome: 'Troca de óleo',
    precoBase: 80 as any,
    descricao: 'Troca completa',
    ativo: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02'),
};

describe('ServicoMapper', () => {
    describe('toDomain()', () => {
        it('maps all fields correctly', () => {
            const servico = ServicoMapper.toDomain(rawServico as any);
            expect(servico.id).toBe('s-1');
            expect(servico.nome).toBe('Troca de óleo');
            expect(servico.precoBase).toBe(80);
            expect(servico.descricao).toBe('Troca completa');
            expect(servico.ativo).toBe(true);
        });

        it('converts null descricao to undefined', () => {
            const servico = ServicoMapper.toDomain({ ...rawServico, descricao: null } as any);
            expect(servico.descricao).toBeUndefined();
        });
    });

    describe('toPrisma()', () => {
        it('maps domain to prisma shape', () => {
            const servico = Servico.restore({ ...rawServico, precoBase: 80 });
            const prisma = ServicoMapper.toPrisma(servico);
            expect(prisma.id).toBe('s-1');
            expect(prisma.nome).toBe('Troca de óleo');
            expect(prisma.ativo).toBe(true);
        });

        it('converts undefined descricao to null', () => {
            const servico = Servico.restore({ ...rawServico, precoBase: 80, descricao: undefined });
            const prisma = ServicoMapper.toPrisma(servico);
            expect(prisma.descricao).toBeNull();
        });
    });
});
