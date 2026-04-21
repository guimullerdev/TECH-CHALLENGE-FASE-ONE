import { PartialType } from '@nestjs/swagger';
import { CreateVeiculoDto } from './create-vehicle.dto';

export class UpdateVeiculoDto extends PartialType(CreateVeiculoDto) {}
