import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateServiceOrderDto {
    @ApiPropertyOptional({ example: 'Veículo apresenta barulho ao frear e luz do motor acesa' })
    @IsString()
    @IsOptional()
    description?: string;
}
