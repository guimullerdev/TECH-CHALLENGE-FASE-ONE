import { Peca as PrismaPeca } from '@prisma/client';
import { Peca } from '../../domain/entities/parts.entity';

export class PecaMapper {
    static toDomain(raw: PrismaPeca): Peca {
        return Peca.restore({
            id: raw.id,
            nome: raw.nome,
            precoUnitario: Number(raw.precoUnitario),
            qtdTotal: raw.qtdTotal,
            qtdDisponivel: raw.qtdDisponivel,
            qtdReservada: raw.qtdReservada,
            codigo: raw.codigo ?? undefined,
            descricao: raw.descricao ?? undefined,
            ativo: raw.ativo,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }

    static toPrisma(peca: Peca): Omit<PrismaPeca, never> {
        return {
            id: peca.id,
            nome: peca.nome,
            precoUnitario: peca.precoUnitario as any,
            qtdTotal: peca.qtdTotal,
            qtdDisponivel: peca.qtdDisponivel,
            qtdReservada: peca.qtdReservada,
            codigo: peca.codigo ?? null,
            descricao: peca.descricao ?? null,
            ativo: peca.ativo,
            createdAt: peca.createdAt,
            updatedAt: peca.updatedAt,
        };
    }
}
