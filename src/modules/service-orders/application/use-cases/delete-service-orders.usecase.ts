import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';

@Injectable()
export class DeleteOrdemDeServicoUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly repo: IOrdemDeServicoRepository,
    ) {}

    async execute(id: string): Promise<void> {
        const os = await this.repo.findById(id);
        if (!os) throw new NotFoundException(`Ordem de serviço ${id} não encontrada`);
        // For now there's no delete on the interface — this shouldn't be called
        throw new Error('Delete not supported for OS');
    }
}
