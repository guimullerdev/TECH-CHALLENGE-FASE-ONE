import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';

export class UpdateVehicleDto {
    @ApiPropertyOptional({ example: 'Toyota' })
    @IsOptional() @IsString() brand?: string;

    @ApiPropertyOptional({ example: 'Corolla' })
    @IsOptional() @IsString() model?: string;

    @ApiPropertyOptional({ example: 2021 })
    @IsOptional() @IsInt() @Min(1886) @Max(new Date().getFullYear() + 1) year?: number;
}
