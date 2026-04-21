import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { InvalidTransitionError, OrdemDeServico } from '../../domain/entities/service-orders.entity';
import { GerarOrcamentoUseCase } from '../../../orcamentos/application/use-cases/gerar-orcamento.usecase';

@Injectable()
export class FinishDiagnosisUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly repo: IOrdemDeServicoRepository,
        private readonly gerarOrcamentoUseCase: GerarOrcamentoUseCase,
    ) {}

    async execute(id: string): Promise<OrdemDeServico> {
        const os = await this.repo.findById(id);
        if (!os) throw new NotFoundException(`Ordem de serviço ${id} não encontrada`);

        let updated: OrdemDeServico;
        try {
            updated = os.concluirDiagnostico();
        } catch (err) {
            if (err instanceof InvalidTransitionError) throw new UnprocessableEntityException(err.message);
            throw err;
        }

        const saved = await this.repo.update(updated);

        // Auto-create Orcamento
        const valorTotal = saved.calcularTotal();
        await this.gerarOrcamentoUseCase.execute(saved.id, valorTotal);

        return saved;
    }
}
