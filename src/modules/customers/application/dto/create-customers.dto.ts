import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { IsDocumentoValido } from '../../../../common/validators/cpf-cnpj.validator';

export class CreateClienteDto {
    @ApiProperty({ example: 'João Silva' })
    @IsNotEmpty()
    @IsString()
    nome: string;

    @ApiProperty({ example: '52998224725', description: 'CPF com 11 dígitos numéricos ou CNPJ com 14 dígitos numéricos' })
    @IsNotEmpty()
    @Matches(/^(\d{11}|\d{14})$/, { message: 'Documento deve ter 11 dígitos (CPF) ou 14 dígitos (CNPJ)' })
    @IsDocumentoValido()
    documento: string;

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
