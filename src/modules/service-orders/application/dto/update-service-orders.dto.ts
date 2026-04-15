import { IsOptional, IsString } from 'class-validator';

export class UpdateServiceOrderDto {
    @IsString()
    @IsOptional()
    description?: string;
}
