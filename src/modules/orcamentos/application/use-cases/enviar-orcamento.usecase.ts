import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { ORCAMENTO_REPOSITORY, IOrcamentoRepository } from '../../domain/repositories/orcamento.repository.interface';
import { Orcamento, OrcamentoTransitionError } from '../../domain/entities/orcamento.entity';

@Injectable()
export class EnviarOrcamentoUseCase {
    constructor(
        @Inject(ORCAMENTO_REPOSITORY)
        private readonly repo: IOrcamentoRepository,
    ) {}

    async execute(id: string): Promise<Orcamento> {
        const orcamento = await this.repo.findById(id);
        if (!orcamento) throw new NotFoundException(`Orçamento ${id} não encontrado`);

        let updated: Orcamento;
        try {
            updated = orcamento.enviar();
        } catch (err) {
            if (err instanceof OrcamentoTransitionError) throw new UnprocessableEntityException(err.message);
            throw err;
        }

        return this.repo.update(updated);
    }
}
