import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ORCAMENTO_REPOSITORY, IOrcamentoRepository } from '../../domain/repositories/orcamento.repository.interface';
import { Orcamento } from '../../domain/entities/orcamento.entity';

@Injectable()
export class GetOrcamentoUseCase {
    constructor(
        @Inject(ORCAMENTO_REPOSITORY)
        private readonly repo: IOrcamentoRepository,
    ) {}

    async execute(id: string): Promise<Orcamento> {
        const orcamento = await this.repo.findById(id);
        if (!orcamento) throw new NotFoundException(`Orçamento ${id} não encontrado`);
        return orcamento;
    }

    async executeByOsId(osId: string): Promise<Orcamento> {
        const orcamento = await this.repo.findByOsId(osId);
        if (!orcamento) throw new NotFoundException(`Orçamento para OS ${osId} não encontrado`);
        return orcamento;
    }
}
