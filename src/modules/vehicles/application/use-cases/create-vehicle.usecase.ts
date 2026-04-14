import { ConflictException, Inject, Injectable } from "@nestjs/common";

import { CreateVehicleDto } from "../dto/create-vehicle.dto";
import { Vehicle } from "../../domain/entities/vehicle.entity";
import type { VehicleRepository } from "../../domain/repositories/vehicle.repository.interface";

@Injectable()
export class CreateVehicleUseCase {
    constructor(
        @Inject('VehicleRepository')
        private readonly repo: VehicleRepository
    ) { }

    async execute(dto: CreateVehicleDto): Promise<Vehicle> {
        const existing = await this.repo.findByPlate(dto.plate.toUpperCase());
        if (existing) throw new ConflictException(`Veículo com placa ${dto.plate} já cadastrado`);
        const vehicle = Vehicle.create(dto);
        return this.repo.create(vehicle);
    }
}
