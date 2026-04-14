import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { VehiclesController } from './presentation/vehicles.controller';
import { CreateVehicleUseCase } from './application/use-cases/create-vehicle.usecase';
import { GetVehicleUseCase } from './application/use-cases/get-vehicle.usecase';
import { UpdateVehicleUseCase } from './application/use-cases/update-vehicle.usecase';
import { DeleteVehicleUseCase } from './application/use-cases/delete-vehicle.usecase';
import { VehiclePrismaRepository } from './infrastructure/repositories/vehicle-prisma.repository';

@Module({
    imports: [PrismaModule],
    controllers: [VehiclesController],
    providers: [
        CreateVehicleUseCase,
        GetVehicleUseCase,
        UpdateVehicleUseCase,
        DeleteVehicleUseCase,
        {
            provide: 'VehicleRepository',
            useClass: VehiclePrismaRepository,
        },
    ],
})
export class VehiclesModule { }
