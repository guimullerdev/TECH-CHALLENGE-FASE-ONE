import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { OrdemDeServico } from '../../domain/entities/service-orders.entity';

@Injectable()
export class RealizarServicoUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly repo: IOrdemDeServicoRepository,
    ) {}

    async execute(osId: string, itemId: string, inicio: Date, fim: Date): Promise<OrdemDeServico> {
        const os = await this.repo.findById(osId);
        if (!os) throw new NotFoundException(`Ordem de serviço ${osId} não encontrada`);

        const updated = os.registrarExecucaoServico(itemId, inicio, fim);
        return this.repo.update(updated);
    }
}
