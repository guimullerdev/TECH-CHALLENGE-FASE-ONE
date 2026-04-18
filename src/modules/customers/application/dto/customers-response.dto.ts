import { ApiProperty } from '@nestjs/swagger';

export class CustomerResponseDto {
    @ApiProperty({ example: 'a3e4f5b6-1234-5678-9abc-def012345678' })
    id: string;

    @ApiProperty({ example: 'João Silva' })
    name: string;

    @ApiProperty({ example: '12345678901', description: 'CPF ou CNPJ' })
    document: string;

    @ApiProperty({ example: 'joao@email.com' })
    email: string;

    @ApiProperty({ example: '11999990000' })
    phone: string;

    @ApiProperty({ example: '2026-04-16T10:00:00.000Z' })
    createdAt: Date;
}
