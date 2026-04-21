import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { OrdemDeServico } from '../../domain/entities/service-orders.entity';

@Injectable()
export class RemoveServicoFromOsUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly osRepo: IOrdemDeServicoRepository,
    ) {}

    async execute(osId: string, servicoId: string): Promise<OrdemDeServico> {
        const os = await this.osRepo.findById(osId);
        if (!os) throw new NotFoundException(`Ordem de serviço ${osId} não encontrada`);

        const item = os.servicos.find(s => s.servicoId === servicoId);
        if (!item) throw new NotFoundException(`Serviço ${servicoId} não encontrado na OS`);

        const updated = os.removeServico(servicoId);
        return this.osRepo.update(updated);
    }
}
