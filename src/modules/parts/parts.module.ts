import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { PECA_REPOSITORY } from './domain/repositories/parts.repository.interface';
import { PecaPrismaRepository } from './infrastructure/repositories/parts-prisma.repository';
import { PartsController } from './presentation/parts.controller';
import { CreatePecaUseCase } from './application/use-cases/create-parts.usecase';
import { GetPecaUseCase } from './application/use-cases/get-parts.usecase';
import { UpdatePecaUseCase } from './application/use-cases/update-parts.usecase';
import { DeactivatePecaUseCase } from './application/use-cases/delete-parts.usecase';
import { ReactivatePecaUseCase } from './application/use-cases/reactivate-parts.usecase';

@Module({
    imports: [PrismaModule],
    controllers: [PartsController],
    providers: [
        CreatePecaUseCase,
        GetPecaUseCase,
        UpdatePecaUseCase,
        DeactivatePecaUseCase,
        ReactivatePecaUseCase,
        {
            provide: PECA_REPOSITORY,
            useClass: PecaPrismaRepository,
        },
    ],
    exports: [PECA_REPOSITORY],
})
export class PartsModule {}
