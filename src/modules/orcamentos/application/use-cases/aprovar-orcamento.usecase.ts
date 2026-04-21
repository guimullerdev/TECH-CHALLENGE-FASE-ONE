import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { ORCAMENTO_REPOSITORY, IOrcamentoRepository } from '../../domain/repositories/orcamento.repository.interface';
import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../../service-orders/domain/repositories/service-orders.repository.interface';
import { Orcamento, OrcamentoTransitionError } from '../../domain/entities/orcamento.entity';
import { InvalidTransitionError } from '../../../service-orders/domain/entities/service-orders.entity';

@Injectable()
export class AprovarOrcamentoUseCase {
    constructor(
        @Inject(ORCAMENTO_REPOSITORY)
        private readonly orcRepo: IOrcamentoRepository,
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly osRepo: IOrdemDeServicoRepository,
    ) {}

    async execute(id: string, observacoes?: string): Promise<Orcamento> {
        const orcamento = await this.orcRepo.findById(id);
        if (!orcamento) throw new NotFoundException(`Orçamento ${id} não encontrado`);

        let updatedOrc: Orcamento;
        try {
            updatedOrc = orcamento.aprovar(observacoes);
        } catch (err) {
            if (err instanceof OrcamentoTransitionError) throw new UnprocessableEntityException(err.message);
            throw err;
        }

        const os = await this.osRepo.findById(orcamento.osId);
        if (os) {
            try {
                const updatedOs = os.aprovarOrcamento();
                await this.osRepo.update(updatedOs);
            } catch (err) {
                if (err instanceof InvalidTransitionError) throw new UnprocessableEntityException(err.message);
                throw err;
            }
        }

        return this.orcRepo.update(updatedOrc);
    }
}
