import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateServicesDto {
    @IsOptional() @IsString() name?: string;
    @IsOptional() @IsString() description?: string;
    @IsOptional() @IsNumber() @Min(0) price?: number;
    @IsOptional() @IsNumber() @Min(1) estimatedTime?: number;
}
