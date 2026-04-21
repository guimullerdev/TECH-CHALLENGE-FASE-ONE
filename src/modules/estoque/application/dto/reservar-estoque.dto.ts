import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsInt, IsOptional, IsString, Min, IsNotEmpty } from 'class-validator';

export class ReservarEstoqueDto {
    @ApiProperty({ example: 'c5d6e7f8-3456-7890-bcde-f01234567890', description: 'UUID da peça' })
    @IsNotEmpty()
    @IsUUID()
    pecaId: string;

    @ApiProperty({ example: 3, description: 'Quantidade a reservar (mínimo 1)' })
    @IsInt()
    @Min(1)
    quantidade: number;

    @ApiProperty({ example: 'a1b2c3d4-1234-5678-90ab-cdef01234567', description: 'UUID da OS' })
    @IsNotEmpty()
    @IsUUID()
    osId: string;

    @ApiPropertyOptional({ example: 'Reserva para OS' })
    @IsOptional()
    @IsString()
    observacao?: string;
}
