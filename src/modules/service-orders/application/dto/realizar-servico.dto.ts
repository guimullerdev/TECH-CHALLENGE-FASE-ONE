import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class RealizarServicoDto {
    @ApiProperty({ example: '2026-04-16T09:00:00.000Z', description: 'Data/hora de início da execução' })
    @IsNotEmpty()
    @IsDateString()
    inicio: string;

    @ApiProperty({ example: '2026-04-16T10:30:00.000Z', description: 'Data/hora de conclusão da execução' })
    @IsNotEmpty()
    @IsDateString()
    fim: string;
}
