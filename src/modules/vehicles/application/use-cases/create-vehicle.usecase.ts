import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { VEICULO_REPOSITORY, IVeiculoRepository } from '../../domain/repositories/vehicle.repository.interface';
import { CLIENTE_REPOSITORY, IClienteRepository } from '../../../customers/domain/repositories/customers.repository.interface';
import { Veiculo } from '../../domain/entities/vehicle.entity';
import { CreateVeiculoDto } from '../dto/create-vehicle.dto';

@Injectable()
export class CreateVeiculoUseCase {
    constructor(
        @Inject(VEICULO_REPOSITORY)
        private readonly veiculoRepo: IVeiculoRepository,
        @Inject(CLIENTE_REPOSITORY)
        private readonly clienteRepo: IClienteRepository,
    ) {}

    async execute(dto: CreateVeiculoDto): Promise<Veiculo> {
        const cliente = await this.clienteRepo.findById(dto.clienteId);
        if (!cliente) throw new NotFoundException(`Cliente ${dto.clienteId} não encontrado`);

        const existing = await this.veiculoRepo.findByPlaca(dto.placa.toUpperCase());
        if (existing) throw new ConflictException(`Veículo com placa ${dto.placa} já cadastrado`);

        const veiculo = Veiculo.create({
            placa: dto.placa,
            marca: dto.marca,
            modelo: dto.modelo,
            clienteId: dto.clienteId,
            ano: dto.ano,
            cor: dto.cor,
            kmAtual: dto.kmAtual,
        });
        return this.veiculoRepo.create(veiculo);
    }
}
