import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreatePartDto {
    @ApiProperty({ example: 'Filtro de óleo' })
    @IsString() name: string;

    @ApiPropertyOptional({ example: 'Filtro de óleo compatível com motores 1.0 a 2.0' })
    @IsOptional() @IsString() description?: string;

    @ApiProperty({ example: 45.90, description: 'Preço unitário em reais' })
    @IsNumber() @Min(0) price: number;

    @ApiProperty({ example: 20, description: 'Quantidade em estoque (não pode ser negativa)' })
    @IsNumber() @Min(0) stockQty: number;
}
