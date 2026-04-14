import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreatePartDto {
    @IsString() name: string;
    @IsOptional() @IsString() description?: string;
    @IsNumber() @Min(0) price: number;
    @IsNumber() @Min(0) stockQty: number;
}
