import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customers.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) { }
