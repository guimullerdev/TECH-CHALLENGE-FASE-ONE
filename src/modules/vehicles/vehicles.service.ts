import { Injectable } from '@nestjs/common';
import { CreateVeiculoDto } from './application/dto/create-vehicle.dto';
import { UpdateVeiculoDto } from './application/dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  create(createVehicleDto: CreateVeiculoDto) {
    return 'This action adds a new vehicle';
  }

  findAll() {
    return `This action returns all vehicles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVeiculoDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
