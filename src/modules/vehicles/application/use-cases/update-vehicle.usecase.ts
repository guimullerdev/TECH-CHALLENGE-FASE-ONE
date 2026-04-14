import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import type { VehicleRepository } from "../../domain/repositories/vehicle.repository.interface";
import { UpdateVehicleDto } from "../dto/update-vehicle.dto";

@Injectable()
export class UpdateVehicleUseCase {
    constructor(
        @Inject('VehicleRepository')
        private readonly repo: VehicleRepository
    ) { }

    async execute(id: string, dto: UpdateVehicleDto) {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException(`Veículo ${id} não encontrado`);
        const updated = existing.update(dto);
        return this.repo.save(updated);
    }
}
