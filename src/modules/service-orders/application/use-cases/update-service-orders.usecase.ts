import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { OrdemDeServico } from '../../domain/entities/service-orders.entity';

export class UpdateOsDto {
    descricaoProblema?: string;
}

@Injectable()
export class UpdateOrdemDeServicoUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly repo: IOrdemDeServicoRepository,
    ) {}

    async execute(id: string, dto: UpdateOsDto): Promise<OrdemDeServico> {
        const os = await this.repo.findById(id);
        if (!os) throw new NotFoundException(`Ordem de serviço ${id} não encontrada`);
        const updated = os.update({ descricaoProblema: dto.descricaoProblema });
        return this.repo.update(updated);
    }
}
