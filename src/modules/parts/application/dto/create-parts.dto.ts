import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreatePecaDto {
    @ApiProperty({ example: 'Filtro de óleo' })
    @IsNotEmpty()
    @IsString()
    nome: string;

    @ApiProperty({ example: 45.90, description: 'Preço unitário em reais' })
    @IsNumber()
    @Min(0)
    precoUnitario: number;

    @ApiPropertyOptional({ example: 20, description: 'Quantidade em estoque inicial' })
    @IsOptional()
    @IsInt()
    @Min(0)
    qtdTotal?: number;

    @ApiPropertyOptional({ example: 'FLT-001', description: 'Código da peça' })
    @IsOptional()
    @IsString()
    codigo?: string;

    @ApiPropertyOptional({ example: 'Filtro de óleo compatível com motores 1.0 a 2.0' })
    @IsOptional()
    @IsString()
    descricao?: string;
}
