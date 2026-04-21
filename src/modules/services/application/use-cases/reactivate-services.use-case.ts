import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { SERVICO_REPOSITORY, IServicoRepository } from '../../domain/repositories/services.repository';
import { Servico } from '../../domain/entities/services.entity';

@Injectable()
export class ReactivateServicoUseCase {
    constructor(
        @Inject(SERVICO_REPOSITORY)
        private readonly repo: IServicoRepository,
    ) {}

    async execute(id: string): Promise<Servico> {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException(`Serviço ${id} não encontrado`);
        const reactivated = existing.reactivate();
        return this.repo.update(reactivated);
    }
}
