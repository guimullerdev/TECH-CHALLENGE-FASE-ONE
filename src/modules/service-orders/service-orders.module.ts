import { Module } from '@nestjs/common';

// Controller
import { ServiceOrdersController } from './presentation/service-orders.controller';

// Use Cases
import { CreateServiceOrderUseCase } from './application/use-cases/create-service-orders.usecase';

// Repositories
import { ServiceOrderPrismaRepository } from './infrastructure/repositories/service-orders-prisma.repository';

@Module({
    controllers: [ServiceOrdersController],
    providers: [
        CreateServiceOrderUseCase,
        {
            provide: 'ServiceOrderRepository',
            useClass: ServiceOrderPrismaRepository,
        },
    ],
})
export class ServiceOrdersModule { }
