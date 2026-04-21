import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PECA_REPOSITORY, IPecaRepository } from '../../domain/repositories/parts.repository.interface';
import { Peca } from '../../domain/entities/parts.entity';

@Injectable()
export class ReactivatePecaUseCase {
    constructor(
        @Inject(PECA_REPOSITORY)
        private readonly repo: IPecaRepository,
    ) {}

    async execute(id: string): Promise<Peca> {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException(`Peça ${id} não encontrada`);
        const reactivated = existing.reactivate();
        return this.repo.update(reactivated);
    }
}
