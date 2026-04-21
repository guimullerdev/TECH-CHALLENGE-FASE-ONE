import { PartialType } from '@nestjs/swagger';
import { CreateServicoDto } from './create-services.dto';

export class UpdateServicoDto extends PartialType(CreateServicoDto) {}
