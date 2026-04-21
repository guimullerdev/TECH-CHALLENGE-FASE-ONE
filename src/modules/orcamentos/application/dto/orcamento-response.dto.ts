import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrcamentoResponseDto {
    @ApiProperty({ example: 'a1b2c3d4-1234-5678-90ab-cdef01234567' })
    id: string;

    @ApiProperty({ example: 'b2c3d4e5-2345-6789-abcd-ef0123456789' })
    osId: string;

    @ApiProperty({ example: 'GERADO', enum: ['GERADO', 'ENVIADO', 'APROVADO', 'REPROVADO'] })
    status: string;

    @ApiProperty({ example: 350.00 })
    valorTotal: number;

    @ApiProperty({ example: '2026-04-16T10:00:00.000Z' })
    dataGeracao: Date;

    @ApiPropertyOptional({ example: '2026-04-16T11:00:00.000Z' })
    dataEnvio?: Date;

    @ApiPropertyOptional({ example: '2026-04-16T12:00:00.000Z' })
    dataResposta?: Date;

    @ApiPropertyOptional({ example: 'Cliente aprovou por telefone' })
    observacoes?: string;

    @ApiProperty({ example: '2026-04-16T10:00:00.000Z' })
    createdAt: Date;

    @ApiProperty({ example: '2026-04-16T12:00:00.000Z' })
    updatedAt: Date;
}
