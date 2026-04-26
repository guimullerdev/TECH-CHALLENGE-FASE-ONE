import { Prisma, StatusOS } from '@prisma/client';
import {
    OrdemDeServico,
    OrdemDeServicoProps,
    OsItemServico,
    OsItemPeca,
} from '../../domain/entities/service-orders.entity';
import { HistoricoStatusOS } from '../../domain/entities/historico-status-os.entity';
import { StatusOS as DomainStatusOS } from '../../domain/entities/service-orders.entity';

type PrismaOSFull = {
    id: string;
    numero: string;
    clienteId: string;
    veiculoId: string;
    status: StatusOS;
    descricaoProblema: string | null;
    dataAbertura: Date;
    dataFechamento: Date | null;
    createdAt: Date;
    updatedAt: Date;
    osItensServico?: Array<{
        id: string;
        servicoId: string;
        precoUnitario: Prisma.Decimal;
        inicioExec: Date | null;
        fimExec: Date | null;
    }>;
    osItensPeca?: Array<{
        id: string;
        pecaId: string;
        quantidade: number;
        precoUnitario: Prisma.Decimal;
        utilizada: boolean;
    }>;
};

export class ServiceOrderMapper {
    static toDomain(raw: PrismaOSFull): OrdemDeServico {
        const servicos: OsItemServico[] = (raw.osItensServico ?? []).map(s => ({
            id: s.id,
            servicoId: s.servicoId,
            precoUnitario: Number(s.precoUnitario),
            status: (s.inicioExec && s.fimExec) ? 'realizado' : 'pendente',
            inicioExec: s.inicioExec ?? undefined,
            fimExec: s.fimExec ?? undefined,
        }));

        const pecas: OsItemPeca[] = (raw.osItensPeca ?? []).map(p => ({
            id: p.id,
            pecaId: p.pecaId,
            quantidade: p.quantidade,
            valorUnitario: Number(p.precoUnitario),
            status: p.utilizada ? 'utilizada' : 'reservada',
        }));

        return OrdemDeServico.restore({
            id: raw.id,
            numero: raw.numero,
            clienteId: raw.clienteId,
            veiculoId: raw.veiculoId,
            status: raw.status as unknown as DomainStatusOS,
            descricaoProblema: raw.descricaoProblema ?? undefined,
            servicos,
            pecas,
            historicoStatus: [],
            dataAbertura: raw.dataAbertura,
            dataFechamento: raw.dataFechamento ?? undefined,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }

    static toPrisma(os: OrdemDeServico) {
        return {
            id: os.id,
            numero: os.numero,
            clienteId: os.clienteId,
            veiculoId: os.veiculoId,
            status: os.status as unknown as StatusOS,
            descricaoProblema: os.descricaoProblema ?? null,
            dataAbertura: os.dataAbertura,
            dataFechamento: os.dataFechamento ?? null,
            createdAt: os.createdAt,
            updatedAt: os.updatedAt,
        };
    }
}
