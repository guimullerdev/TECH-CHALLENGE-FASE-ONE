import { Module } from '@nestjs/common';

import { ServicesController } from './services.controller';
import { ServicesRepository } from '../domain/repositories/services.repository';
import { ServicesPrismaRepository } from '../infrastructure/repositories/services.prisma.repository';
import { CreateServicesUseCase } from '../application/use-cases/create-services.use-case';
import { GetServicesUseCase } from '../application/use-cases/get-services.use-case';
import { UpdateServicesUseCase } from '../application/use-cases/update-services.use-case';
import { DeleteServicesUseCase } from '../application/use-cases/delete-services.use-case';

@Module({
    controllers: [ServicesController],
    providers: [
        CreateServicesUseCase,
        GetServicesUseCase,
        UpdateServicesUseCase,
        DeleteServicesUseCase,
        {
            provide: ServicesRepository,
            useClass: ServicesPrismaRepository,
        },
    ],
    exports: [ServicesRepository],
})
export class ServicesModule { }
