import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PartResponseDto {
    @ApiProperty({ example: 'c5d6e7f8-3456-7890-bcde-f01234567890' })
    id: string;

    @ApiProperty({ example: 'Filtro de óleo' })
    name: string;

    @ApiPropertyOptional({ example: 'Filtro de óleo compatível com motores 1.0 a 2.0' })
    description: string | null;

    @ApiProperty({ example: 45.90, description: 'Preço unitário em reais' })
    price: number;

    @ApiProperty({ example: 20, description: 'Quantidade em estoque' })
    stockQty: number;
}
