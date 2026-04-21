import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateClienteDto {
    @ApiProperty({ example: 'João Silva' })
    @IsNotEmpty()
    @IsString()
    nome: string;

    @ApiProperty({ example: '12345678901', description: 'CPF com 11 dígitos numéricos' })
    @IsNotEmpty()
    @Matches(/^\d{11}$/, { message: 'CPF deve ter exatamente 11 dígitos numéricos' })
    cpf: string;

    @ApiPropertyOptional({ example: '11999990000' })
    @IsOptional()
    @IsString()
    telefone?: string;

    @ApiPropertyOptional({ example: 'joao@email.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ example: 'Rua das Flores, 123' })
    @IsOptional()
    @IsString()
    endereco?: string;
}
