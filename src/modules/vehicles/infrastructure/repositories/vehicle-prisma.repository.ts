import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

import { VehicleRepository } from "../../domain/repositories/vehicle.repository.interface";
import { VehicleMapper } from "../mappers/vehicle.mapper";
import { Vehicle } from "../../domain/entities/vehicle.entity";

@Injectable()
export class VehiclePrismaRepository implements VehicleRepository {
    constructor(private prisma: PrismaService) { }

    async findById(id: string): Promise<Vehicle | null> {
        const raw = await this.prisma.vehicle.findUnique({ where: { id } });
        if (!raw) return null;
        return VehicleMapper.toDomain(raw);
    }

    async findByPlate(plate: string): Promise<Vehicle | null> {
        const raw = await this.prisma.vehicle.findUnique({ where: { plate } });
        if (!raw) return null;
        return VehicleMapper.toDomain(raw);
    }

    async findAll(): Promise<Vehicle[]> {
        const raws = await this.prisma.vehicle.findMany({ orderBy: { plate: 'asc' } });
        return raws.map(VehicleMapper.toDomain);
    }

    async create(vehicle: Vehicle): Promise<Vehicle> {
        const raw = await this.prisma.vehicle.create({ data: VehicleMapper.toPrisma(vehicle) });
        return VehicleMapper.toDomain(raw);
    }

    async save(vehicle: Vehicle): Promise<Vehicle> {
        const raw = await this.prisma.vehicle.update({
            where: { id: vehicle.id },
            data: VehicleMapper.toPrisma(vehicle),
        });
        return VehicleMapper.toDomain(raw);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.vehicle.delete({ where: { id } });
    }
}
