import { Inject, Injectable } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { OrdemDeServico } from '../../domain/entities/service-orders.entity';
import { CreateOsDto } from '../dto/create-service-orders.dto';

@Injectable()
export class CreateOrdemDeServicoUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly repo: IOrdemDeServicoRepository,
    ) {}

    async execute(dto: CreateOsDto): Promise<OrdemDeServico> {
        const numero = await this.repo.generateNumero();
        const os = OrdemDeServico.create({
            numero,
            clienteId: dto.clienteId,
            veiculoId: dto.veiculoId,
            descricaoProblema: dto.descricaoProblema,
        });
        return this.repo.create(os);
    }
}
