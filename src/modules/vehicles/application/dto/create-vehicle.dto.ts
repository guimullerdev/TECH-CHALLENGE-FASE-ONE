import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsUUID, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateVehicleDto {
    @ApiProperty({ example: 'ABC1D234', description: 'Placa no formato Mercosul ou antigo' })
    @IsNotEmpty() @IsString() plate: string;

    @ApiProperty({ example: 'Toyota' })
    @IsNotEmpty() @IsString() brand: string;

    @ApiProperty({ example: 'Corolla' })
    @IsNotEmpty() @IsString() model: string;

    @ApiProperty({ example: 2020 })
    @IsInt() @Min(1886) @Max(new Date().getFullYear() + 1) year: number;

    @ApiProperty({ example: 'a3e4f5b6-1234-5678-9abc-def012345678', description: 'UUID do cliente proprietário' })
    @IsNotEmpty() @IsUUID() customerId: string;
}
