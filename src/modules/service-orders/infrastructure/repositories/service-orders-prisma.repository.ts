import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { OrdemDeServico, StatusOS, OsItemServico, OsItemPeca } from '../../domain/entities/service-orders.entity';
import { ServiceOrderMapper } from '../mappers/service-orders.mapper';
import { PrismaService } from 'src/prisma/prisma.service';

const STATUS_PRIORITY: Partial<Record<StatusOS, number>> = {
    [StatusOS.EM_EXECUCAO]: 1,
    [StatusOS.AGUARDANDO_APROVACAO]: 2,
    [StatusOS.EM_DIAGNOSTICO]: 3,
    [StatusOS.RECEBIDA]: 4,
};

function byStatusPriorityThenOldest(a: OrdemDeServico, b: OrdemDeServico): number {
    const pa = STATUS_PRIORITY[a.status] ?? 99;
    const pb = STATUS_PRIORITY[b.status] ?? 99;
    if (pa !== pb) return pa - pb;
    return a.dataAbertura.getTime() - b.dataAbertura.getTime();
}

const includeItems = {
    osItensServico: true,
    osItensPeca: true,
} as const;

@Injectable()
export class OrdemDeServicoPrismaRepository implements IOrdemDeServicoRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: string): Promise<OrdemDeServico | null> {
        const raw = await this.prisma.ordemDeServico.findUnique({ where: { id }, include: includeItems });
        if (!raw) return null;
        return ServiceOrderMapper.toDomain(raw);
    }

    async findAll(filters?: { status?: StatusOS; clienteId?: string; veiculoId?: string; incluirArquivadas?: boolean }): Promise<OrdemDeServico[]> {
        const raws = await this.prisma.ordemDeServico.findMany({
            where: {
                ...(filters?.status ? { status: filters.status as any } : {}),
                ...(filters?.clienteId ? { clienteId: filters.clienteId } : {}),
                ...(filters?.veiculoId ? { veiculoId: filters.veiculoId } : {}),
                ...(filters?.incluirArquivadas ? {} : { arquivada: false }),
            },
            include: includeItems,
            orderBy: { dataAbertura: 'asc' },
        });
        return raws.map(ServiceOrderMapper.toDomain).sort(byStatusPriorityThenOldest);
    }

    async create(os: OrdemDeServico): Promise<OrdemDeServico> {
        const raw = await this.prisma.ordemDeServico.create({
            data: ServiceOrderMapper.toPrisma(os),
            include: includeItems,
        });
        return ServiceOrderMapper.toDomain(raw);
    }

    async update(os: OrdemDeServico): Promise<OrdemDeServico> {
        await this.prisma.$transaction(async (tx) => {
            await tx.ordemDeServico.update({
                where: { id: os.id },
                data: {
                    status: os.status as any,
                    arquivada: os.arquivada,
                    descricaoProblema: os.descricaoProblema ?? null,
                    dataFechamento: os.dataFechamento ?? null,
                    updatedAt: os.updatedAt,
                },
            });

            // Sync OsItensServico
            await tx.osItemServico.deleteMany({ where: { osId: os.id } });
            if (os.servicos.length > 0) {
                await tx.osItemServico.createMany({
                    data: os.servicos.map((s: OsItemServico) => ({
                        id: s.id,
                        osId: os.id,
                        servicoId: s.servicoId,
                        precoUnitario: new Prisma.Decimal(s.precoUnitario),
                        inicioExec: s.inicioExec ?? null,
                        fimExec: s.fimExec ?? null,
                    })),
                });
            }

            // Sync OsItensPeca
            await tx.osItemPeca.deleteMany({ where: { osId: os.id } });
            if (os.pecas.length > 0) {
                await tx.osItemPeca.createMany({
                    data: os.pecas.map((p: OsItemPeca) => ({
                        id: p.id,
                        osId: os.id,
                        pecaId: p.pecaId,
                        quantidade: p.quantidade,
                        precoUnitario: new Prisma.Decimal(p.valorUnitario),
                        utilizada: p.status === 'utilizada',
                    })),
                });
            }
        });

        const updated = await this.prisma.ordemDeServico.findUniqueOrThrow({
            where: { id: os.id },
            include: includeItems,
        });
        return ServiceOrderMapper.toDomain(updated);
    }

    async generateNumero(): Promise<string> {
        const count = await this.prisma.ordemDeServico.count();
        const seq = String(count + 1).padStart(6, '0');
        const year = new Date().getFullYear();
        return `OS-${year}-${seq}`;
    }
}
