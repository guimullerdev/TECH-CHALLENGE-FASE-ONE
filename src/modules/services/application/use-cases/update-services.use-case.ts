import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { SERVICO_REPOSITORY, IServicoRepository } from '../../domain/repositories/services.repository';
import { Servico } from '../../domain/entities/services.entity';
import { UpdateServicoDto } from '../dto/update-services.dto';

@Injectable()
export class UpdateServicoUseCase {
    constructor(
        @Inject(SERVICO_REPOSITORY)
        private readonly repo: IServicoRepository,
    ) {}

    async execute(id: string, dto: UpdateServicoDto): Promise<Servico> {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException(`Serviço ${id} não encontrado`);
        const updated = existing.update({
            nome: dto.nome,
            precoBase: dto.precoBase,
            descricao: dto.descricao,
            tempoEstimado: dto.tempoEstimado,
        });
        return this.repo.update(updated);
    }
}
