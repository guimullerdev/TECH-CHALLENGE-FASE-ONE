import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { VEICULO_REPOSITORY, IVeiculoRepository } from '../../domain/repositories/vehicle.repository.interface';
import { Veiculo } from '../../domain/entities/vehicle.entity';

@Injectable()
export class GetVeiculoUseCase {
    constructor(
        @Inject(VEICULO_REPOSITORY)
        private readonly repo: IVeiculoRepository,
    ) {}

    async execute(id: string): Promise<Veiculo> {
        const veiculo = await this.repo.findById(id);
        if (!veiculo) throw new NotFoundException(`Veículo ${id} não encontrado`);
        return veiculo;
    }

    async executeAll(filters?: { id?: string; clienteId?: string; placa?: string; ativo?: boolean }): Promise<Veiculo[]> {
        if (filters?.id) {
            const v = await this.repo.findById(filters.id);
            return v ? [v] : [];
        }
        return this.repo.findAll({
            clienteId: filters?.clienteId,
            placa: filters?.placa,
            ativo: filters?.ativo,
        });
    }
}
