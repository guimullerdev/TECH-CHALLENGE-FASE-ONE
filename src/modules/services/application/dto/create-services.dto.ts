import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateServicesDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  estimatedTime: number;
}