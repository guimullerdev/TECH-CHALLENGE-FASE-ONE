import { Servico as PrismaServico } from '@prisma/client';
import { Servico } from '../../domain/entities/services.entity';

export class ServicoMapper {
    static toDomain(raw: PrismaServico): Servico {
        return Servico.restore({
            id: raw.id,
            nome: raw.nome,
            precoBase: Number(raw.precoBase),
            descricao: raw.descricao ?? undefined,
            tempoEstimado: raw.tempoEstimado ?? undefined,
            ativo: raw.ativo,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }

    static toPrisma(servico: Servico): Omit<PrismaServico, never> {
        return {
            id: servico.id,
            nome: servico.nome,
            precoBase: servico.precoBase as any,
            descricao: servico.descricao ?? null,
            tempoEstimado: servico.tempoEstimado ?? null,
            ativo: servico.ativo,
            createdAt: servico.createdAt,
            updatedAt: servico.updatedAt,
        };
    }
}
