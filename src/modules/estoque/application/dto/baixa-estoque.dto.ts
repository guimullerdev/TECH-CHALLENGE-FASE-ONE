import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsInt, IsOptional, IsString, IsBoolean, Min, IsNotEmpty } from 'class-validator';

export class BaixaEstoqueDto {
    @ApiProperty({ example: 'c5d6e7f8-3456-7890-bcde-f01234567890', description: 'UUID da peça' })
    @IsNotEmpty()
    @IsUUID()
    pecaId: string;

    @ApiProperty({ example: 5, description: 'Quantidade a baixar do estoque (mínimo 1)' })
    @IsInt()
    @Min(1)
    quantidade: number;

    @ApiPropertyOptional({ example: 'Utilização em OS' })
    @IsOptional()
    @IsString()
    observacao?: string;

    /** Internal flag: true when fulfilling a reservation (decrements qtdReservada, not qtdDisponivel) */
    @IsOptional()
    @IsBoolean()
    fromReservation?: boolean;
}
