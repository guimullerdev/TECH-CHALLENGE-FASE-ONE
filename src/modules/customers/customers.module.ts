// customers.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';

// Controller
import { CustomersController } from './presentation/customers.controller';

// Use-cases
import { CreateCustomerUseCase } from './application/use-cases/create-customers.usecase';
import { CustomerPrismaRepository } from './infrastructure/repositories/customers-prisma.repository';
// import { GetCustomerUseCase } from './application/use-cases/get-customers.usecase';
// import { UpdateCustomerUseCase } from './application/use-cases/update-customers.usecase';
// import { DeleteCustomerUseCase } from './application/use-cases/delete-customers.usecase';



@Module({
    imports: [PrismaModule],
    controllers: [CustomersController],
    providers: [
        // Use-cases
        CreateCustomerUseCase,
        // GetCustomerUseCase,
        // UpdateCustomerUseCase,
        // DeleteCustomerUseCase,
        {
            provide: 'CustomerRepository',
            useClass: CustomerPrismaRepository,
        },
    ],
})
export class CustomersModule { }