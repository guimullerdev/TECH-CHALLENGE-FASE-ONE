import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { SERVICO_REPOSITORY, IServicoRepository } from '../../domain/repositories/services.repository';
import { Servico } from '../../domain/entities/services.entity';

@Injectable()
export class GetServicoUseCase {
    constructor(
        @Inject(SERVICO_REPOSITORY)
        private readonly repo: IServicoRepository,
    ) {}

    async execute(id: string): Promise<Servico> {
        const servico = await this.repo.findById(id);
        if (!servico) throw new NotFoundException(`Serviço ${id} não encontrado`);
        return servico;
    }

    async executeAll(filters?: { id?: string; ativo?: boolean }): Promise<Servico[]> {
        if (filters?.id) {
            const s = await this.repo.findById(filters.id);
            return s ? [s] : [];
        }
        return this.repo.findAll({ ativo: filters?.ativo });
    }
}
