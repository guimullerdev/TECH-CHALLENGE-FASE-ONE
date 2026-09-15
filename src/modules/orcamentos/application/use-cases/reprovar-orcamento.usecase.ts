import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { ORCAMENTO_REPOSITORY, IOrcamentoRepository } from '../../domain/repositories/orcamento.repository.interface';
import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../../service-orders/domain/repositories/service-orders.repository.interface';
import { LiberarReservaUseCase } from '../../../estoque/application/use-cases/liberar-reserva.usecase';
import { Orcamento, OrcamentoTransitionError } from '../../domain/entities/orcamento.entity';
import { OsStatusMetrics } from '../../../service-orders/application/os-status-metrics.service';
import { InvalidTransitionError } from '../../../service-orders/domain/entities/service-orders.entity';

@Injectable()
export class ReprovarOrcamentoUseCase {
    constructor(
        @Inject(ORCAMENTO_REPOSITORY)
        private readonly orcRepo: IOrcamentoRepository,
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly osRepo: IOrdemDeServicoRepository,
        private readonly liberarReservaUseCase: LiberarReservaUseCase,
        private readonly metrics: OsStatusMetrics,
    ) {}

    async execute(id: string, observacoes?: string): Promise<Orcamento> {
        const orcamento = await this.orcRepo.findById(id);
        if (!orcamento) throw new NotFoundException(`Orçamento ${id} não encontrado`);

        let updatedOrc: Orcamento;
        try {
            updatedOrc = orcamento.reprovar(observacoes);
        } catch (err) {
            if (err instanceof OrcamentoTransitionError) throw new UnprocessableEntityException(err.message);
            throw err;
        }

        const os = await this.osRepo.findById(orcamento.osId);
        if (os) {
            try {
                const updatedOs = os.reprovarOrcamento();
                await this.osRepo.update(updatedOs);
                // Mesma razão do fluxo de aprovação: a transição
                // AGUARDANDO_APROVACAO → REPROVADA nasce fora do controller
                // de OS, então o interceptor não a vê.
                this.metrics.registrarTransicao(updatedOs);

                // Liberar reservas de todas as peças da OS
                for (const peca of os.pecas) {
                    await this.liberarReservaUseCase.execute({
                        pecaId: peca.pecaId,
                        quantidade: peca.quantidade,
                        osId: os.id,
                        observacao: 'Liberação automática por reprovação de orçamento',
                    });
                }
            } catch (err) {
                if (err instanceof InvalidTransitionError) throw new UnprocessableEntityException(err.message);
                throw err;
            }
        }

        return this.orcRepo.update(updatedOrc);
    }
}
