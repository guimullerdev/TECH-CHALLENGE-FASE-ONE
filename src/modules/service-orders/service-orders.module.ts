import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { ServicesModule } from '../services/presentation/services.module';
import { PartsModule } from '../parts/parts.module';

import { ServiceOrdersController } from './presentation/service-orders.controller';
import { ServiceOrderPrismaRepository } from './infrastructure/repositories/service-orders-prisma.repository';

import { CreateServiceOrderUseCase } from './application/use-cases/create-service-orders.usecase';
import { GetServiceOrderUseCase } from './application/use-cases/get-service-orders.usecase';
import { UpdateServiceOrderUseCase } from './application/use-cases/update-service-orders.usecase';
import { DeleteServiceOrderUseCase } from './application/use-cases/delete-service-orders.usecase';
import { AddServiceToOrderUseCase } from './application/use-cases/add-service-to-order.usecase';
import { RemoveServiceFromOrderUseCase } from './application/use-cases/remove-service-from-order.usecase';
import { AddPartToOrderUseCase } from './application/use-cases/add-part-to-order.usecase';
import { RemovePartFromOrderUseCase } from './application/use-cases/remove-part-from-order.usecase';
import { StartDiagnosisUseCase } from './application/use-cases/start-diagnosis.usecase';
import { FinishDiagnosisUseCase } from './application/use-cases/finish-diagnosis.usecase';
import { SendBudgetUseCase } from './application/use-cases/send-budget.usecase';
import { ApproveBudgetUseCase } from './application/use-cases/approve-budget.usecase';
import { RejectBudgetUseCase } from './application/use-cases/reject-budget.usecase';
import { FinishOrderUseCase } from './application/use-cases/finish-order.usecase';
import { DeliverOrderUseCase } from './application/use-cases/deliver-order.usecase';

@Module({
    imports: [PrismaModule, ServicesModule, PartsModule],
    controllers: [ServiceOrdersController],
    providers: [
        CreateServiceOrderUseCase,
        GetServiceOrderUseCase,
        UpdateServiceOrderUseCase,
        DeleteServiceOrderUseCase,
        AddServiceToOrderUseCase,
        RemoveServiceFromOrderUseCase,
        AddPartToOrderUseCase,
        RemovePartFromOrderUseCase,
        StartDiagnosisUseCase,
        FinishDiagnosisUseCase,
        SendBudgetUseCase,
        ApproveBudgetUseCase,
        RejectBudgetUseCase,
        FinishOrderUseCase,
        DeliverOrderUseCase,
        {
            provide: 'ServiceOrderRepository',
            useClass: ServiceOrderPrismaRepository,
        },
    ],
    exports: ['ServiceOrderRepository'],
})
export class ServiceOrdersModule { }
