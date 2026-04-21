import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { VEICULO_REPOSITORY, IVeiculoRepository } from '../../domain/repositories/vehicle.repository.interface';
import { Veiculo } from '../../domain/entities/vehicle.entity';

@Injectable()
export class DeactivateVeiculoUseCase {
    constructor(
        @Inject(VEICULO_REPOSITORY)
        private readonly repo: IVeiculoRepository,
    ) {}

    async execute(id: string): Promise<Veiculo> {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException(`Veículo ${id} não encontrado`);
        const deactivated = existing.deactivate();
        return this.repo.update(deactivated);
    }
}
