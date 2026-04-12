import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceOrderDto } from './create-service-orders.dto';

export class UpdateServiceOrderDto extends PartialType(CreateServiceOrderDto) { }
