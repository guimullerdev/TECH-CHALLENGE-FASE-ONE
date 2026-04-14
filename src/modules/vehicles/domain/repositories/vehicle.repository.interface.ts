import { Vehicle } from "../entities/vehicle.entity";

export interface VehicleRepository {
    findById(id: string): Promise<Vehicle | null>;
    findByPlate(plate: string): Promise<Vehicle | null>;
    findAll(): Promise<Vehicle[]>;
    create(vehicle: Vehicle): Promise<Vehicle>;
    save(vehicle: Vehicle): Promise<Vehicle>;
    delete(id: string): Promise<void>;
}
