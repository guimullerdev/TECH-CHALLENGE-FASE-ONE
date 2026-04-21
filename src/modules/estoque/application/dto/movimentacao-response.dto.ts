import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MovimentacaoResponseDto {
    @ApiProperty({ example: 'a1b2c3d4-1234-5678-90ab-cdef01234567' })
    id: string;

    @ApiProperty({ example: 'c5d6e7f8-3456-7890-bcde-f01234567890' })
    pecaId: string;

    @ApiProperty({ example: 'ENTRADA', enum: ['ENTRADA', 'BAIXA', 'RESERVA', 'LIBERACAO_RESERVA'] })
    tipo: string;

    @ApiProperty({ example: 10 })
    quantidade: number;

    @ApiPropertyOptional({ example: 'a1b2c3d4-1234-5678-90ab-cdef01234567' })
    osId?: string;

    @ApiPropertyOptional({ example: 'Compra de fornecedor' })
    observacao?: string;

    @ApiProperty({ example: '2026-04-16T10:00:00.000Z' })
    createdAt: Date;
}
