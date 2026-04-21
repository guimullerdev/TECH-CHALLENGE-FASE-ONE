import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsUUID, IsNotEmpty, IsOptional, Min, Max } from 'class-validator';

export class CreateVeiculoDto {
    @ApiProperty({ example: 'a3e4f5b6-1234-5678-9abc-def012345678', description: 'UUID do cliente' })
    @IsNotEmpty()
    @IsUUID()
    clienteId: string;

    @ApiProperty({ example: 'ABC1D234', description: 'Placa no formato Mercosul ou antigo' })
    @IsNotEmpty()
    @IsString()
    placa: string;

    @ApiProperty({ example: 'Toyota' })
    @IsNotEmpty()
    @IsString()
    marca: string;

    @ApiProperty({ example: 'Corolla' })
    @IsNotEmpty()
    @IsString()
    modelo: string;

    @ApiPropertyOptional({ example: 2020 })
    @IsOptional()
    @IsInt()
    @Min(1886)
    @Max(new Date().getFullYear() + 1)
    ano?: number;

    @ApiPropertyOptional({ example: 'Prata' })
    @IsOptional()
    @IsString()
    cor?: string;

    @ApiPropertyOptional({ example: 50000 })
    @IsOptional()
    @IsInt()
    @Min(0)
    kmAtual?: number;
}
