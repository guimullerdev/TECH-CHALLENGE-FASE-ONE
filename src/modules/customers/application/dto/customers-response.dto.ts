import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ClienteResponseDto {
    @ApiProperty({ example: 'a3e4f5b6-1234-5678-9abc-def012345678' })
    id: string;

    @ApiProperty({ example: 'João Silva' })
    nome: string;

    @ApiProperty({ example: '52998224725' })
    documento: string;

    @ApiProperty({ example: 'CPF', enum: ['CPF', 'CNPJ'] })
    tipoDocumento: 'CPF' | 'CNPJ';

    @ApiPropertyOptional({ example: '11999990000' })
    telefone?: string;

    @ApiPropertyOptional({ example: 'joao@email.com' })
    email?: string;

    @ApiPropertyOptional({ example: 'Rua das Flores, 123' })
    endereco?: string;

    @ApiProperty({ example: true })
    ativo: boolean;

    @ApiProperty({ example: '2026-04-16T10:00:00.000Z' })
    createdAt: Date;

    @ApiProperty({ example: '2026-04-16T10:00:00.000Z' })
    updatedAt: Date;
}
