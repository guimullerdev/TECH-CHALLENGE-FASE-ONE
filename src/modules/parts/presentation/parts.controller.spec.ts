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

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PartsController],
            providers: [
                { provide: CreatePecaUseCase, useValue: {} },
                { provide: GetPecaUseCase, useValue: {} },
                { provide: UpdatePecaUseCase, useValue: {} },
                { provide: DeactivatePecaUseCase, useValue: {} },
                { provide: ReactivatePecaUseCase, useValue: {} },
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
});
