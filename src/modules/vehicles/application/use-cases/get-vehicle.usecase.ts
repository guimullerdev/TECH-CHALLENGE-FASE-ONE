import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import type { VehicleRepository } from "../../domain/repositories/vehicle.repository.interface";

@Injectable()
export class GetVehicleUseCase {
    constructor(
        @Inject('VehicleRepository')
        private readonly repo: VehicleRepository
    ) { }

    async execute(id: string) {
        const vehicle = await this.repo.findById(id);
        if (!vehicle) throw new NotFoundException(`Veículo ${id} não encontrado`);
        return vehicle;
    }

    async executeAll() {
        return this.repo.findAll();
    }
}
