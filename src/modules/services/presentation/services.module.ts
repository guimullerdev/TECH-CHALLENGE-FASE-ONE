import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { CreateServicesUseCase } from '../application/use-cases/create-services.use-case';
import { ServicesRepository } from '../domain/repositories/services.repository';
import { ServicesPrismaRepository } from '../infrastructure/repositories/services.prisma.repository';

@Module({
controllers: [ServicesController],
providers: [
CreateServicesUseCase,
{
provide: ServicesRepository,
useClass: ServicesPrismaRepository,
},
],
exports: [ServicesRepository],
})
export class ServicesModule {}