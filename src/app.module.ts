import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

import { HealthController } from './common/health/health.controller';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingModule } from './common/logging/logging.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { CustomersModule } from './modules/customers/customers.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { ServicesModule } from './modules/services/presentation/services.module';
import { PartsModule } from './modules/parts/parts.module';
import { EstoqueModule } from './modules/estoque/estoque.module';
import { OrcamentosModule } from './modules/orcamentos/orcamentos.module';
import { ServiceOrdersModule } from './modules/service-orders/service-orders.module';
import { RelatoriosModule } from './modules/relatorios/relatorios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggingModule,
    PrismaModule,
    AuthModule,
    CustomersModule,
    VehiclesModule,
    ServicesModule,
    PartsModule,
    EstoqueModule,
    OrcamentosModule,
    ServiceOrdersModule,
    RelatoriosModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // Registrado aqui, e não via `useGlobalFilters` no main.ts, para receber
    // o PinoLogger por injeção — é o que deixa a falha sair como log
    // estruturado e virar alerta.
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
