import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdatePartDto {
    @ApiPropertyOptional({ example: 'Filtro de óleo' })
    @IsOptional() @IsString() name?: string;

    @ApiPropertyOptional({ example: 'Filtro de óleo compatível com motores 1.0 a 2.0' })
    @IsOptional() @IsString() description?: string;

    @ApiPropertyOptional({ example: 45.90, description: 'Preço unitário em reais' })
    @IsOptional() @IsNumber() @Min(0) price?: number;

    @ApiPropertyOptional({ example: 20, description: 'Quantidade em estoque' })
    @IsOptional() @IsNumber() @Min(0) stockQty?: number;
}
