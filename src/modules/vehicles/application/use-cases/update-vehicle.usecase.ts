import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { VEICULO_REPOSITORY, IVeiculoRepository } from '../../domain/repositories/vehicle.repository.interface';
import { Veiculo } from '../../domain/entities/vehicle.entity';
import { UpdateVeiculoDto } from '../dto/update-vehicle.dto';

@Injectable()
export class UpdateVeiculoUseCase {
    constructor(
        @Inject(VEICULO_REPOSITORY)
        private readonly repo: IVeiculoRepository,
    ) {}

    async execute(id: string, dto: UpdateVeiculoDto): Promise<Veiculo> {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException(`Veículo ${id} não encontrado`);
        const updated = existing.update({
            marca: dto.marca,
            modelo: dto.modelo,
            ano: dto.ano,
            cor: dto.cor,
            kmAtual: dto.kmAtual,
        });
        return this.repo.update(updated);
    }
}
