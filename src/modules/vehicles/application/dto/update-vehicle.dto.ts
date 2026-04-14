import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';

export class UpdateVehicleDto {
    @IsOptional() @IsString() brand?: string;
    @IsOptional() @IsString() model?: string;
    @IsOptional() @IsInt() @Min(1886) @Max(new Date().getFullYear() + 1) year?: number;
}
