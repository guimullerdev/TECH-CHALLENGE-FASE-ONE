import { MovimentacaoEstoque as PrismaMovimentacao } from '@prisma/client';
import { MovimentacaoEstoque, TipoMovimentacao } from '../../domain/entities/movimentacao-estoque.entity';

export class MovimentacaoEstoqueMapper {
    static toDomain(raw: PrismaMovimentacao): MovimentacaoEstoque {
        return MovimentacaoEstoque.restore({
            id: raw.id,
            pecaId: raw.pecaId,
            tipo: raw.tipo as TipoMovimentacao,
            quantidade: raw.quantidade,
            osId: raw.osId ?? undefined,
            observacao: raw.observacao ?? undefined,
            createdAt: raw.createdAt,
        });
    }

    static toPrisma(mov: MovimentacaoEstoque): Omit<PrismaMovimentacao, never> {
        return {
            id: mov.id,
            pecaId: mov.pecaId,
            tipo: mov.tipo as any,
            quantidade: mov.quantidade,
            osId: mov.osId ?? null,
            observacao: mov.observacao ?? null,
            createdAt: mov.createdAt,
        };
    }
}
