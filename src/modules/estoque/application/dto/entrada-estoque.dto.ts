import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsInt, IsOptional, IsString, Min, IsNotEmpty } from 'class-validator';

export class EntradaEstoqueDto {
    @ApiProperty({ example: 'c5d6e7f8-3456-7890-bcde-f01234567890', description: 'UUID da peça' })
    @IsNotEmpty()
    @IsUUID()
    pecaId: string;

    @ApiProperty({ example: 10, description: 'Quantidade a inserir no estoque (mínimo 1)' })
    @IsInt()
    @Min(1)
    quantidade: number;

    @ApiPropertyOptional({ example: 'Compra de fornecedor' })
    @IsOptional()
    @IsString()
    observacao?: string;
}
