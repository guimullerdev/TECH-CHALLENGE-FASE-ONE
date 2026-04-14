import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdatePartDto {
    @IsOptional() @IsString() name?: string;
    @IsOptional() @IsString() description?: string;
    @IsOptional() @IsNumber() @Min(0) price?: number;
    @IsOptional() @IsNumber() @Min(0) stockQty?: number;
}
