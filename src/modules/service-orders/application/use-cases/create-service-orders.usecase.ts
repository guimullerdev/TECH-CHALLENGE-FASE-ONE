import { Inject, Injectable, BadRequestException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { VEICULO_REPOSITORY, IVeiculoRepository } from '../../../vehicles/domain/repositories/vehicle.repository.interface';
import { CLIENTE_REPOSITORY, IClienteRepository } from '../../../customers/domain/repositories/customers.repository.interface';
import { OrdemDeServico } from '../../domain/entities/service-orders.entity';
import { CreateOsDto } from '../dto/create-service-orders.dto';
import { AddServicoToOsUseCase } from './add-service-to-order.usecase';
import { AddPecaToOsUseCase } from './add-part-to-order.usecase';

@Injectable()
export class CreateOrdemDeServicoUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly repo: IOrdemDeServicoRepository,
        @Inject(VEICULO_REPOSITORY)
        private readonly veiculoRepo: IVeiculoRepository,
        @Inject(CLIENTE_REPOSITORY)
        private readonly clienteRepo: IClienteRepository,
        private readonly addServicoUseCase: AddServicoToOsUseCase,
        private readonly addPecaUseCase: AddPecaToOsUseCase,
    ) {}

    async execute(dto: CreateOsDto): Promise<OrdemDeServico> {
        const cliente = await this.clienteRepo.findById(dto.clienteId);
        if (!cliente) {
            throw new NotFoundException(`Cliente ${dto.clienteId} não encontrado`);
        }
        if (!cliente.ativo) {
            throw new UnprocessableEntityException('Não é possível abrir OS para um cliente inativo');
        }

        const veiculo = await this.veiculoRepo.findById(dto.veiculoId);
        if (!veiculo) {
            throw new NotFoundException(`Veículo ${dto.veiculoId} não encontrado`);
        }
        if (!veiculo.ativo) {
            throw new UnprocessableEntityException('Não é possível abrir OS para um veículo inativo');
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
        let saved = await this.repo.create(os);

        for (const s of dto.servicos ?? []) {
            saved = await this.addServicoUseCase.execute(saved.id, s.servicoId);
        }

        for (const p of dto.pecas ?? []) {
            saved = await this.addPecaUseCase.execute(saved.id, p.pecaId, p.quantidade);
        }

        return saved;
    }
}
