import { Inject, Injectable } from '@nestjs/common';

import { ORCAMENTO_REPOSITORY, IOrcamentoRepository } from '../../domain/repositories/orcamento.repository.interface';
import { Orcamento } from '../../domain/entities/orcamento.entity';

@Injectable()
export class GerarOrcamentoUseCase {
    constructor(
        @Inject(ORCAMENTO_REPOSITORY)
        private readonly repo: IOrcamentoRepository,
    ) {}

    async execute(osId: string, valorTotal: number): Promise<Orcamento> {
        const orcamento = Orcamento.create({ osId, valorTotal });
        return this.repo.create(orcamento);
    }
}
