import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { OrdemDeServico, StatusOS } from '../../domain/entities/service-orders.entity';

@Injectable()
export class GetOrdemDeServicoUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly repo: IOrdemDeServicoRepository,
    ) {}

    async execute(id: string): Promise<OrdemDeServico> {
        const os = await this.repo.findById(id);
        if (!os) throw new NotFoundException(`Ordem de serviço ${id} não encontrada`);
        return os;
    }

    async executeAll(filters?: { status?: StatusOS; clienteId?: string; veiculoId?: string; incluirArquivadas?: boolean }): Promise<OrdemDeServico[]> {
        return this.repo.findAll(filters);
    }
}
