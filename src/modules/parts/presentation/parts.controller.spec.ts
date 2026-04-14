import { Test, TestingModule } from '@nestjs/testing';
import { PartsController } from './parts.controller';
import { CreatePartUseCase } from '../application/use-cases/create-parts.usecase';
import { GetPartUseCase } from '../application/use-cases/get-parts.usecase';
import { UpdatePartUseCase } from '../application/use-cases/update-parts.usecase';
import { DeletePartUseCase } from '../application/use-cases/delete-parts.usecase';

describe('PartsController', () => {
    let controller: PartsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PartsController],
            providers: [
                { provide: CreatePartUseCase, useValue: {} },
                { provide: GetPartUseCase, useValue: {} },
                { provide: UpdatePartUseCase, useValue: {} },
                { provide: DeletePartUseCase, useValue: {} },
            ],
        }).compile();

        controller = module.get<PartsController>(PartsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
