import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { CustomersModule } from '../customers/customers.module';
import { VEICULO_REPOSITORY } from './domain/repositories/vehicle.repository.interface';
import { VeiculoPrismaRepository } from './infrastructure/repositories/vehicle-prisma.repository';
import { VehiclesController } from './presentation/vehicles.controller';
import { CreateVeiculoUseCase } from './application/use-cases/create-vehicle.usecase';
import { GetVeiculoUseCase } from './application/use-cases/get-vehicle.usecase';
import { UpdateVeiculoUseCase } from './application/use-cases/update-vehicle.usecase';
import { DeactivateVeiculoUseCase } from './application/use-cases/delete-vehicle.usecase';

@Module({
    imports: [PrismaModule, CustomersModule],
    controllers: [VehiclesController],
    providers: [
        CreateVeiculoUseCase,
        GetVeiculoUseCase,
        UpdateVeiculoUseCase,
        DeactivateVeiculoUseCase,
        {
            provide: VEICULO_REPOSITORY,
            useClass: VeiculoPrismaRepository,
        },
    ],
    exports: [VEICULO_REPOSITORY],
})
export class VehiclesModule {}
