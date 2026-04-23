import { Test, TestingModule } from '@nestjs/testing';
import { PartsController } from './parts.controller';
import { CreatePecaUseCase } from '../application/use-cases/create-parts.usecase';
import { GetPecaUseCase } from '../application/use-cases/get-parts.usecase';
import { UpdatePecaUseCase } from '../application/use-cases/update-parts.usecase';
import { DeactivatePecaUseCase } from '../application/use-cases/delete-parts.usecase';
import { ReactivatePecaUseCase } from '../application/use-cases/reactivate-parts.usecase';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

describe('PartsController', () => {
    let controller: PartsController;
    let createUC: { execute: jest.Mock };
    let getUC: { execute: jest.Mock; executeAll: jest.Mock };
    let updateUC: { execute: jest.Mock };
    let deactivateUC: { execute: jest.Mock };
    let reactivateUC: { execute: jest.Mock };

    beforeEach(async () => {
        createUC = { execute: jest.fn().mockResolvedValue({ id: 'p-1' }) };
        getUC = { execute: jest.fn().mockResolvedValue({ id: 'p-1' }), executeAll: jest.fn().mockResolvedValue([]) };
        updateUC = { execute: jest.fn().mockResolvedValue({ id: 'p-1' }) };
        deactivateUC = { execute: jest.fn().mockResolvedValue({ id: 'p-1' }) };
        reactivateUC = { execute: jest.fn().mockResolvedValue({ id: 'p-1' }) };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PartsController],
            providers: [
                { provide: CreatePecaUseCase, useValue: createUC },
                { provide: GetPecaUseCase, useValue: getUC },
                { provide: UpdatePecaUseCase, useValue: updateUC },
                { provide: DeactivatePecaUseCase, useValue: deactivateUC },
                { provide: ReactivatePecaUseCase, useValue: reactivateUC },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<PartsController>(PartsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('create delegates to CreatePecaUseCase', async () => {
        const dto = { nome: 'Filtro', precoUnitario: 25 };
        await controller.create(dto as any);
        expect(createUC.execute).toHaveBeenCalledWith(dto);
    });

    it('findAll without filters passes undefined', async () => {
        await controller.findAll(undefined, undefined);
        expect(getUC.executeAll).toHaveBeenCalledWith({ ativo: undefined, disponivel: undefined });
    });

    it('findAll with ativo=true and disponivel=true', async () => {
        await controller.findAll('true', 'true');
        expect(getUC.executeAll).toHaveBeenCalledWith({ ativo: true, disponivel: true });
    });

    it('findAll with ativo=false and disponivel=false', async () => {
        await controller.findAll('false', 'false');
        expect(getUC.executeAll).toHaveBeenCalledWith({ ativo: false, disponivel: false });
    });

    it('findOne delegates to GetPecaUseCase.execute', async () => {
        await controller.findOne('p-1');
        expect(getUC.execute).toHaveBeenCalledWith('p-1');
    });

    it('update delegates to UpdatePecaUseCase', async () => {
        await controller.update('p-1', { nome: 'Filtro Premium' } as any);
        expect(updateUC.execute).toHaveBeenCalledWith('p-1', { nome: 'Filtro Premium' });
    });

    it('deactivate delegates to DeactivatePecaUseCase', async () => {
        await controller.deactivate('p-1');
        expect(deactivateUC.execute).toHaveBeenCalledWith('p-1');
    });

    it('reactivate delegates to ReactivatePecaUseCase', async () => {
        await controller.reactivate('p-1');
        expect(reactivateUC.execute).toHaveBeenCalledWith('p-1');
    });
});
