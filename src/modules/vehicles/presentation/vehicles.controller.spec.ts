import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { CreateVehicleUseCase } from '../application/use-cases/create-vehicle.usecase';
import { GetVehicleUseCase } from '../application/use-cases/get-vehicle.usecase';
import { UpdateVehicleUseCase } from '../application/use-cases/update-vehicle.usecase';
import { DeleteVehicleUseCase } from '../application/use-cases/delete-vehicle.usecase';

describe('VehiclesController', () => {
    let controller: VehiclesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VehiclesController],
            providers: [
                { provide: CreateVehicleUseCase, useValue: {} },
                { provide: GetVehicleUseCase, useValue: {} },
                { provide: UpdateVehicleUseCase, useValue: {} },
                { provide: DeleteVehicleUseCase, useValue: {} },
            ],
        }).compile();

        controller = module.get<VehiclesController>(VehiclesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
