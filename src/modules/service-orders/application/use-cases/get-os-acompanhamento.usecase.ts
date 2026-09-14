import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';

export interface OsAcompanhamentoResponse {
    id: string;
    numero: string;
    statusAtual: string;
    historicoStatus: Array<{
        statusAnterior: string | null;
        statusNovo: string;
        data: Date;
    }>;
    servicos: Array<{
        servicoId: string;
        status: string;
    }>;
    pecas: Array<{
        pecaId: string;
        quantidade: number;
        status: string;
    }>;
    dataAbertura: Date;
    dataFechamento?: Date;
}

@Injectable()
export class GetOsAcompanhamentoUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly repo: IOrdemDeServicoRepository,
    ) {}

    /**
     * @param restringirAoClienteId quando informado, a OS só é devolvida se
     * pertencer a esse cliente. Usado quando quem chama é o próprio cliente
     * (token da Lambda): sem isso, bastaria conhecer o UUID de uma OS para
     * ler a de qualquer outra pessoa.
     */
    async execute(osId: string, restringirAoClienteId?: string): Promise<OsAcompanhamentoResponse> {
        const os = await this.repo.findById(osId);
        if (!os) throw new NotFoundException(`Ordem de serviço ${osId} não encontrada`);

        // 404 em vez de 403 de propósito: responder "existe, mas não é sua"
        // confirmaria a existência da OS para quem não deveria saber.
        if (restringirAoClienteId && os.clienteId !== restringirAoClienteId) {
            throw new NotFoundException(`Ordem de serviço ${osId} não encontrada`);
        }

        return {
            id: os.id,
            numero: os.numero,
            statusAtual: os.status,
            historicoStatus: os.historicoStatus.map(h => ({
                statusAnterior: h.statusAnterior,
                statusNovo: h.statusNovo,
                data: h.data,
            })),
            servicos: os.servicos.map(s => ({
                servicoId: s.servicoId,
                status: s.status,
            })),
            pecas: os.pecas.map(p => ({
                pecaId: p.pecaId,
                quantidade: p.quantidade,
                status: p.status,
            })),
            dataAbertura: os.dataAbertura,
            dataFechamento: os.dataFechamento,
        };
    }
}
