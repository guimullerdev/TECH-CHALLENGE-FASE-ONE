import { Module } from '@nestjs/common';

import { PrismaModule } from '../../../prisma/prisma.module';
import { SERVICO_REPOSITORY } from '../domain/repositories/services.repository';
import { ServicoPrismaRepository } from '../infrastructure/repositories/services.prisma.repository';
import { ServicesController } from './services.controller';
import { CreateServicoUseCase } from '../application/use-cases/create-services.use-case';
import { GetServicoUseCase } from '../application/use-cases/get-services.use-case';
import { UpdateServicoUseCase } from '../application/use-cases/update-services.use-case';
import { DeactivateServicoUseCase } from '../application/use-cases/delete-services.use-case';
import { ReactivateServicoUseCase } from '../application/use-cases/reactivate-services.use-case';

@Module({
    imports: [PrismaModule],
    controllers: [ServicesController],
    providers: [
        CreateServicoUseCase,
        GetServicoUseCase,
        UpdateServicoUseCase,
        DeactivateServicoUseCase,
        ReactivateServicoUseCase,
        {
            provide: SERVICO_REPOSITORY,
            useClass: ServicoPrismaRepository,
        },
    ],
    exports: [SERVICO_REPOSITORY],
})
export class ServicesModule {}
