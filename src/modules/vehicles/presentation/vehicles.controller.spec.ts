import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { CreateVeiculoUseCase } from '../application/use-cases/create-vehicle.usecase';
import { GetVeiculoUseCase } from '../application/use-cases/get-vehicle.usecase';
import { UpdateVeiculoUseCase } from '../application/use-cases/update-vehicle.usecase';
import { DeactivateVeiculoUseCase } from '../application/use-cases/delete-vehicle.usecase';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

describe('VehiclesController', () => {
    let controller: VehiclesController;
    let createUC: { execute: jest.Mock };
    let getUC: { execute: jest.Mock; executeAll: jest.Mock };
    let updateUC: { execute: jest.Mock };
    let deactivateUC: { execute: jest.Mock };

    beforeEach(async () => {
        createUC = { execute: jest.fn().mockResolvedValue({ id: 'v-1' }) };
        getUC = { execute: jest.fn().mockResolvedValue({ id: 'v-1' }), executeAll: jest.fn().mockResolvedValue([]) };
        updateUC = { execute: jest.fn().mockResolvedValue({ id: 'v-1' }) };
        deactivateUC = { execute: jest.fn().mockResolvedValue({ id: 'v-1' }) };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [VehiclesController],
            providers: [
                { provide: CreateVeiculoUseCase, useValue: createUC },
                { provide: GetVeiculoUseCase, useValue: getUC },
                { provide: UpdateVeiculoUseCase, useValue: updateUC },
                { provide: DeactivateVeiculoUseCase, useValue: deactivateUC },
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

    it('create delegates to CreateVeiculoUseCase', async () => {
        const dto = { placa: 'ABC1234', marca: 'Toyota', modelo: 'Corolla', clienteId: 'c-1' };
        await controller.create(dto as any);
        expect(createUC.execute).toHaveBeenCalledWith(dto);
    });

    it('findAll without filters passes undefined ativo', async () => {
        await controller.findAll(undefined, undefined, undefined);
        expect(getUC.executeAll).toHaveBeenCalledWith({ clienteId: undefined, placa: undefined, ativo: undefined });
    });

    it('findAll with ativo=true passes true', async () => {
        await controller.findAll(undefined, undefined, 'true');
        expect(getUC.executeAll).toHaveBeenCalledWith({ clienteId: undefined, placa: undefined, ativo: true });
    });

    it('findAll with ativo=false passes false', async () => {
        await controller.findAll(undefined, undefined, 'false');
        expect(getUC.executeAll).toHaveBeenCalledWith({ clienteId: undefined, placa: undefined, ativo: false });
    });

    it('findAll with clienteId and placa filters', async () => {
        await controller.findAll('c-1', 'ABC1234', undefined);
        expect(getUC.executeAll).toHaveBeenCalledWith({ clienteId: 'c-1', placa: 'ABC1234', ativo: undefined });
    });

    it('findOne delegates to GetVeiculoUseCase.execute', async () => {
        await controller.findOne('v-1');
        expect(getUC.execute).toHaveBeenCalledWith('v-1');
    });

    it('update delegates to UpdateVeiculoUseCase', async () => {
        await controller.update('v-1', { marca: 'Honda' } as any);
        expect(updateUC.execute).toHaveBeenCalledWith('v-1', { marca: 'Honda' });
    });

    it('deactivate delegates to DeactivateVeiculoUseCase', async () => {
        await controller.deactivate('v-1');
        expect(deactivateUC.execute).toHaveBeenCalledWith('v-1');
    });
});
