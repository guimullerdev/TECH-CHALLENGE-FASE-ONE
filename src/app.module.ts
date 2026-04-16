import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './modules/customers/customers.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { ServicesModule } from './modules/services/presentation/services.module';
import { PartsModule } from './modules/parts/parts.module';
import { ServiceOrdersModule } from './modules/service-orders/service-orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    ServiceOrdersModule,
    CustomersModule,
    VehiclesModule,

    ServicesModule,
    PartsModule,
  ],
})
export class AppModule { }
