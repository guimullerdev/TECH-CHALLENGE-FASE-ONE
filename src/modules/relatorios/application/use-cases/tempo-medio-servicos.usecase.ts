import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TempoMedioServicoDto } from '../dto/tempo-medio-servico-response.dto';

@Injectable()
export class TempoMedioServicosUseCase {
    constructor(private readonly prisma: PrismaService) {}

    async execute(): Promise<TempoMedioServicoDto[]> {
        const itens = await this.prisma.osItemServico.findMany({
            where: { fimExec: { not: null }, inicioExec: { not: null } },
            include: { servico: true },
        });

        const grouped = new Map<string, { nome: string; duracoes: number[] }>();

        for (const item of itens) {
            const duracaoMs = item.fimExec!.getTime() - item.inicioExec!.getTime();
            const duracaoMin = duracaoMs / 60000;

            if (!grouped.has(item.servicoId)) {
                grouped.set(item.servicoId, { nome: item.servico.nome, duracoes: [] });
            }
            grouped.get(item.servicoId)!.duracoes.push(duracaoMin);
        }

        return Array.from(grouped.entries()).map(([servicoId, { nome, duracoes }]) => ({
            servicoId,
            servicoNome: nome,
            qtdExecucoes: duracoes.length,
            tempoMedioMinutos: Math.round(duracoes.reduce((a, b) => a + b, 0) / duracoes.length),
            tempoMinMinutos: Math.round(Math.min(...duracoes)),
            tempoMaxMinutos: Math.round(Math.max(...duracoes)),
        }));
    }
}
