import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import { CreateServicoUseCase } from '../application/use-cases/create-services.use-case';
import { GetServicoUseCase } from '../application/use-cases/get-services.use-case';
import { UpdateServicoUseCase } from '../application/use-cases/update-services.use-case';
import { DeactivateServicoUseCase } from '../application/use-cases/delete-services.use-case';
import { ReactivateServicoUseCase } from '../application/use-cases/reactivate-services.use-case';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

describe('ServicesController', () => {
    let controller: ServicesController;
    let createUC: { execute: jest.Mock };
    let getUC: { execute: jest.Mock; executeAll: jest.Mock };
    let updateUC: { execute: jest.Mock };
    let deactivateUC: { execute: jest.Mock };
    let reactivateUC: { execute: jest.Mock };

    beforeEach(async () => {
        createUC = { execute: jest.fn().mockResolvedValue({ id: 's-1' }) };
        getUC = { execute: jest.fn().mockResolvedValue({ id: 's-1' }), executeAll: jest.fn().mockResolvedValue([]) };
        updateUC = { execute: jest.fn().mockResolvedValue({ id: 's-1' }) };
        deactivateUC = { execute: jest.fn().mockResolvedValue({ id: 's-1' }) };
        reactivateUC = { execute: jest.fn().mockResolvedValue({ id: 's-1' }) };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ServicesController],
            providers: [
                { provide: CreateServicoUseCase, useValue: createUC },
                { provide: GetServicoUseCase, useValue: getUC },
                { provide: UpdateServicoUseCase, useValue: updateUC },
                { provide: DeactivateServicoUseCase, useValue: deactivateUC },
                { provide: ReactivateServicoUseCase, useValue: reactivateUC },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<ServicesController>(ServicesController);
    });

    it('create delegates to CreateServicoUseCase', async () => {
        await controller.create({ nome: 'Troca', precoBase: 80 });
        expect(createUC.execute).toHaveBeenCalledWith({ nome: 'Troca', precoBase: 80 });
    });

    it('findAll without filter passes undefined', async () => {
        await controller.findAll(undefined);
        expect(getUC.executeAll).toHaveBeenCalledWith({ ativo: undefined });
    });

    it('findAll with ativo=true', async () => {
        await controller.findAll('true');
        expect(getUC.executeAll).toHaveBeenCalledWith({ ativo: true });
    });

    it('findAll with ativo=false', async () => {
        await controller.findAll('false');
        expect(getUC.executeAll).toHaveBeenCalledWith({ ativo: false });
    });

    it('findOne delegates to GetServicoUseCase.execute', async () => {
        await controller.findOne('s-1');
        expect(getUC.execute).toHaveBeenCalledWith('s-1');
    });

    it('update delegates to UpdateServicoUseCase', async () => {
        await controller.update('s-1', { nome: 'Revisão' });
        expect(updateUC.execute).toHaveBeenCalledWith('s-1', { nome: 'Revisão' });
    });

    it('deactivate delegates to DeactivateServicoUseCase', async () => {
        await controller.deactivate('s-1');
        expect(deactivateUC.execute).toHaveBeenCalledWith('s-1');
    });

    it('reactivate delegates to ReactivateServicoUseCase', async () => {
        await controller.reactivate('s-1');
        expect(reactivateUC.execute).toHaveBeenCalledWith('s-1');
    });
});
