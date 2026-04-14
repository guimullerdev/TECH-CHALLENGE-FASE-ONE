import { Vehicle } from '../../domain/entities/vehicle.entity';

export class VehicleMapper {
    static toDomain(raw: any): Vehicle {
        return Vehicle.restore({
            id: raw.id,
            plate: raw.plate,
            brand: raw.brand,
            model: raw.model,
            year: raw.year,
            customerId: raw.customerId,
        });
    }

    static toPrisma(vehicle: Vehicle): any {
        return {
            id: vehicle.id,
            plate: vehicle.plate,
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            customerId: vehicle.customerId,
        };
    }
}
