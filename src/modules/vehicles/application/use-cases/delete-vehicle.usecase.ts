import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import type { VehicleRepository } from "../../domain/repositories/vehicle.repository.interface";

@Injectable()
export class DeleteVehicleUseCase {
    constructor(
        @Inject('VehicleRepository')
        private readonly repo: VehicleRepository
    ) { }

    async execute(id: string): Promise<void> {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException(`Veículo ${id} não encontrado`);
        await this.repo.delete(id);
    }
}
