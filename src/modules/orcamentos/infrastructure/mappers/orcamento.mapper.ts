import { Orcamento as PrismaOrcamento } from '@prisma/client';
import { Orcamento, StatusOrcamento } from '../../domain/entities/orcamento.entity';

export class OrcamentoMapper {
    static toDomain(raw: PrismaOrcamento): Orcamento {
        return Orcamento.restore({
            id: raw.id,
            osId: raw.osId,
            status: raw.status as StatusOrcamento,
            valorTotal: Number(raw.valorTotal),
            dataGeracao: raw.dataGeracao,
            dataEnvio: raw.dataEnvio ?? undefined,
            dataResposta: raw.dataResposta ?? undefined,
            observacoes: raw.observacoes ?? undefined,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }

    static toPrisma(orcamento: Orcamento): Omit<PrismaOrcamento, never> {
        return {
            id: orcamento.id,
            osId: orcamento.osId,
            status: orcamento.status as any,
            valorTotal: orcamento.valorTotal as any,
            dataGeracao: orcamento.dataGeracao,
            dataEnvio: orcamento.dataEnvio ?? null,
            dataResposta: orcamento.dataResposta ?? null,
            observacoes: orcamento.observacoes ?? null,
            createdAt: orcamento.createdAt,
            updatedAt: orcamento.updatedAt,
        };
    }
}
