import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PECA_REPOSITORY, IPecaRepository } from '../../domain/repositories/parts.repository.interface';
import { Peca } from '../../domain/entities/parts.entity';

@Injectable()
export class GetPecaUseCase {
    constructor(
        @Inject(PECA_REPOSITORY)
        private readonly repo: IPecaRepository,
    ) {}

    async execute(id: string): Promise<Peca> {
        const peca = await this.repo.findById(id);
        if (!peca) throw new NotFoundException(`Peça ${id} não encontrada`);
        return peca;
    }

    async executeAll(filters?: { id?: string; ativo?: boolean; disponivel?: boolean }): Promise<Peca[]> {
        if (filters?.id) {
            const p = await this.repo.findById(filters.id);
            return p ? [p] : [];
        }
        return this.repo.findAll({ ativo: filters?.ativo, disponivel: filters?.disponivel });
    }
}
