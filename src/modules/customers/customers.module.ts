import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { CLIENTE_REPOSITORY } from './domain/repositories/customers.repository.interface';
import { ClientePrismaRepository } from './infrastructure/repositories/customers-prisma.repository';
import { CustomersController } from './presentation/customers.controller';
import { CreateClienteUseCase } from './application/use-cases/create-customers.usecase';
import { GetClienteUseCase } from './application/use-cases/get-customers.usecase';
import { UpdateClienteUseCase } from './application/use-cases/update-customers.usecase';
import { DeactivateClienteUseCase } from './application/use-cases/delete-customers.usecase';

@Module({
    imports: [PrismaModule],
    controllers: [CustomersController],
    providers: [
        CreateClienteUseCase,
        GetClienteUseCase,
        UpdateClienteUseCase,
        DeactivateClienteUseCase,
        {
            provide: CLIENTE_REPOSITORY,
            useClass: ClientePrismaRepository,
        },
    ],
    exports: [CLIENTE_REPOSITORY],
})
export class CustomersModule {}
