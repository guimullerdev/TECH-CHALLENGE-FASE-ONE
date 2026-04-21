import { PartialType } from '@nestjs/swagger';
import { CreatePecaDto } from './create-parts.dto';

export class UpdatePecaDto extends PartialType(CreatePecaDto) {}
