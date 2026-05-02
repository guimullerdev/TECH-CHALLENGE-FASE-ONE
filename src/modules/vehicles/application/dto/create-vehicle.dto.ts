import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsUUID, IsNotEmpty, IsOptional, Min, Max, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateVeiculoDto {
    @ApiProperty({ example: 'a3e4f5b6-1234-5678-9abc-def012345678', description: 'UUID do cliente' })
    @IsNotEmpty()
    @IsUUID()
    clienteId: string;

    @ApiProperty({ example: 'ABC1D23', description: 'Placa no formato antigo (ABC1234) ou Mercosul (ABC1D23)' })
    @IsNotEmpty()
    @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase().replace(/[-\s]/g, '') : value))
    @Matches(/^([A-Z]{3}\d{4}|[A-Z]{3}\d[A-Z]\d{2})$/, { message: 'Placa inválida. Use o formato antigo (ABC1234) ou Mercosul (ABC1D23)' })
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
