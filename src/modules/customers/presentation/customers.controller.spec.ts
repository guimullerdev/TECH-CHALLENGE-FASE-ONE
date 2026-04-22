import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CreateClienteUseCase } from '../application/use-cases/create-customers.usecase';
import { GetClienteUseCase } from '../application/use-cases/get-customers.usecase';
import { UpdateClienteUseCase } from '../application/use-cases/update-customers.usecase';
import { DeactivateClienteUseCase } from '../application/use-cases/delete-customers.usecase';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

const uc = (val: any = {}) => ({ execute: jest.fn().mockResolvedValue(val), executeAll: jest.fn().mockResolvedValue([]) });

describe('CustomersController', () => {
    let controller: CustomersController;
    let createUC: { execute: jest.Mock };
    let getUC: { execute: jest.Mock; executeAll: jest.Mock };
    let updateUC: { execute: jest.Mock };
    let deactivateUC: { execute: jest.Mock };

    beforeEach(async () => {
        createUC = { execute: jest.fn().mockResolvedValue({ id: 'c-1' }) };
        getUC = { execute: jest.fn().mockResolvedValue({ id: 'c-1' }), executeAll: jest.fn().mockResolvedValue([{ id: 'c-1' }]) };
        updateUC = { execute: jest.fn().mockResolvedValue({ id: 'c-1' }) };
        deactivateUC = { execute: jest.fn().mockResolvedValue({ id: 'c-1' }) };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [CustomersController],
            providers: [
                { provide: CreateClienteUseCase, useValue: createUC },
                { provide: GetClienteUseCase, useValue: getUC },
                { provide: UpdateClienteUseCase, useValue: updateUC },
                { provide: DeactivateClienteUseCase, useValue: deactivateUC },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<CustomersController>(CustomersController);
    });

    it('create delegates to CreateClienteUseCase', async () => {
        const dto = { nome: 'João', cpf: '000' };
        await controller.create(dto as any);
        expect(createUC.execute).toHaveBeenCalledWith(dto);
    });

    it('findAll delegates to GetClienteUseCase.executeAll', async () => {
        await controller.findAll(undefined, undefined, undefined);
        expect(getUC.executeAll).toHaveBeenCalledWith({ nome: undefined, cpf: undefined, ativo: undefined });
    });

    it('findAll with ativo=true passes true filter', async () => {
        await controller.findAll(undefined, undefined, 'true');
        expect(getUC.executeAll).toHaveBeenCalledWith({ nome: undefined, cpf: undefined, ativo: true });
    });

    it('findAll with ativo=false passes false filter', async () => {
        await controller.findAll(undefined, undefined, 'false');
        expect(getUC.executeAll).toHaveBeenCalledWith({ nome: undefined, cpf: undefined, ativo: false });
    });

    it('findOne delegates to GetClienteUseCase.execute', async () => {
        await controller.findOne('c-1');
        expect(getUC.execute).toHaveBeenCalledWith('c-1');
    });

    it('update delegates to UpdateClienteUseCase', async () => {
        await controller.update('c-1', { nome: 'João' } as any);
        expect(updateUC.execute).toHaveBeenCalledWith('c-1', { nome: 'João' });
    });

    it('deactivate delegates to DeactivateClienteUseCase', async () => {
        await controller.deactivate('c-1');
        expect(deactivateUC.execute).toHaveBeenCalledWith('c-1');
    });
});
