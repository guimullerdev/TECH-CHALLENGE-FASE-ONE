import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { VEICULO_REPOSITORY, IVeiculoRepository } from '../../../vehicles/domain/repositories/vehicle.repository.interface';
import { OrdemDeServico } from '../../domain/entities/service-orders.entity';
import { CreateOsDto } from '../dto/create-service-orders.dto';

@Injectable()
export class CreateOrdemDeServicoUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly repo: IOrdemDeServicoRepository,
        @Inject(VEICULO_REPOSITORY)
        private readonly veiculoRepo: IVeiculoRepository,
    ) {}

    async execute(dto: CreateOsDto): Promise<OrdemDeServico> {
        const veiculo = await this.veiculoRepo.findById(dto.veiculoId);
        if (!veiculo) {
            throw new NotFoundException(`Veículo ${dto.veiculoId} não encontrado`);
        }
        if (veiculo.clienteId !== dto.clienteId) {
            throw new BadRequestException('O veículo informado não pertence ao cliente vinculado');
        }

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
