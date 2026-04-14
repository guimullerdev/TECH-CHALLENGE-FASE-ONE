import { IsString, IsInt, IsUUID, Min, Max } from 'class-validator';

export class CreateVehicleDto {
    @IsString() plate: string;
    @IsString() brand: string;
    @IsString() model: string;
    @IsInt() @Min(1886) @Max(new Date().getFullYear() + 1) year: number;
    @IsUUID() customerId: string;
}
