import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PecaResponseDto {
    @ApiProperty({ example: 'c5d6e7f8-3456-7890-bcde-f01234567890' })
    id: string;

    @ApiProperty({ example: 'Filtro de óleo' })
    nome: string;

    @ApiProperty({ example: 45.90, description: 'Preço unitário em reais' })
    precoUnitario: number;

    @ApiProperty({ example: 20 })
    qtdTotal: number;

    @ApiProperty({ example: 15 })
    qtdDisponivel: number;

    @ApiProperty({ example: 5 })
    qtdReservada: number;

    @ApiPropertyOptional({ example: 'FLT-001' })
    codigo?: string;

    @ApiPropertyOptional({ example: 'Filtro de óleo compatível com motores 1.0 a 2.0' })
    descricao?: string;

    @ApiProperty({ example: true })
    ativo: boolean;

    @ApiProperty({ example: '2026-04-16T10:00:00.000Z' })
    createdAt: Date;

    @ApiProperty({ example: '2026-04-16T10:00:00.000Z' })
    updatedAt: Date;
}
