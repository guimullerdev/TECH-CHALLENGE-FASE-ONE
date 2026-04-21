import { Inject, Injectable } from '@nestjs/common';

import { SERVICO_REPOSITORY, IServicoRepository } from '../../domain/repositories/services.repository';
import { Servico } from '../../domain/entities/services.entity';
import { CreateServicoDto } from '../dto/create-services.dto';

@Injectable()
export class CreateServicoUseCase {
    constructor(
        @Inject(SERVICO_REPOSITORY)
        private readonly repo: IServicoRepository,
    ) {}

    async execute(dto: CreateServicoDto): Promise<Servico> {
        const servico = Servico.create({
            nome: dto.nome,
            precoBase: dto.precoBase,
            descricao: dto.descricao,
        });
        return this.repo.create(servico);
    }
}
