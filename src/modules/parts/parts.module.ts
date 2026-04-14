import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { PartsController } from './presentation/parts.controller';
import { CreatePartUseCase } from './application/use-cases/create-parts.usecase';
import { GetPartUseCase } from './application/use-cases/get-parts.usecase';
import { UpdatePartUseCase } from './application/use-cases/update-parts.usecase';
import { DeletePartUseCase } from './application/use-cases/delete-parts.usecase';
import { PartPrismaRepository } from './infrastructure/repositories/parts-prisma.repository';

@Module({
    imports: [PrismaModule],
    controllers: [PartsController],
    providers: [
        CreatePartUseCase,
        GetPartUseCase,
        UpdatePartUseCase,
        DeletePartUseCase,
        {
            provide: 'PartRepository',
            useClass: PartPrismaRepository,
        },
    ],
    exports: ['PartRepository'],
})
export class PartsModule { }
