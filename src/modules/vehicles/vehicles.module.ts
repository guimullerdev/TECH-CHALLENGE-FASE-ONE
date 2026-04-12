import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './presentation/vehicles.controller';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule { }
