import { PartialType } from '@nestjs/swagger';
import { CreateClienteDto } from './create-customers.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {}
