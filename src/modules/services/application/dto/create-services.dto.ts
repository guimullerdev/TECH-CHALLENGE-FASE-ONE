import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateServicesDto {
    @ApiProperty({ example: 'Troca de óleo' })
    @IsString()
    name: string;

    @ApiPropertyOptional({ example: 'Troca de óleo mineral 5W30 com filtro' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 150.00, description: 'Preço em reais' })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ example: 30, description: 'Tempo estimado em minutos' })
    @IsNumber()
    @Min(1)
    estimatedTime: number;
}
