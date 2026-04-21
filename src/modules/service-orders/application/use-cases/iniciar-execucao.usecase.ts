import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { InvalidTransitionError, OrdemDeServico } from '../../domain/entities/service-orders.entity';

@Injectable()
export class IniciarExecucaoUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly repo: IOrdemDeServicoRepository,
    ) {}

    async execute(id: string): Promise<OrdemDeServico> {
        const os = await this.repo.findById(id);
        if (!os) throw new NotFoundException(`Ordem de serviço ${id} não encontrada`);

        let updated: OrdemDeServico;
        try {
            updated = os.iniciarExecucao();
        } catch (err) {
            if (err instanceof InvalidTransitionError) throw new UnprocessableEntityException(err.message);
            throw err;
        }

        return this.repo.update(updated);
    }
}
