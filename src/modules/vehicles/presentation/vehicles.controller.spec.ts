import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { CreateVeiculoUseCase } from '../application/use-cases/create-vehicle.usecase';
import { GetVeiculoUseCase } from '../application/use-cases/get-vehicle.usecase';
import { UpdateVeiculoUseCase } from '../application/use-cases/update-vehicle.usecase';
import { DeactivateVeiculoUseCase } from '../application/use-cases/delete-vehicle.usecase';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

describe('VehiclesController', () => {
    let controller: VehiclesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VehiclesController],
            providers: [
                { provide: CreateVeiculoUseCase, useValue: {} },
                { provide: GetVeiculoUseCase, useValue: {} },
                { provide: UpdateVeiculoUseCase, useValue: {} },
                { provide: DeactivateVeiculoUseCase, useValue: {} },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<VehiclesController>(VehiclesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
