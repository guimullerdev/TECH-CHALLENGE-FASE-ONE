import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { CustomersModule } from './modules/customers/customers.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { ServicesModule } from './modules/services/presentation/services.module';
import { PartsModule } from './modules/parts/parts.module';
import { EstoqueModule } from './modules/estoque/estoque.module';
import { OrcamentosModule } from './modules/orcamentos/orcamentos.module';
import { ServiceOrdersModule } from './modules/service-orders/service-orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    CustomersModule,
    VehiclesModule,
    ServicesModule,
    PartsModule,
    EstoqueModule,
    OrcamentosModule,
    ServiceOrdersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
