import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateServicesDto {
    @ApiPropertyOptional({ example: 'Troca de óleo' })
    @IsOptional() @IsString() name?: string;

    @ApiPropertyOptional({ example: 'Troca de óleo mineral 5W30 com filtro' })
    @IsOptional() @IsString() description?: string;

    @ApiPropertyOptional({ example: 150.00, description: 'Preço em reais' })
    @IsOptional() @IsNumber() @Min(0) price?: number;

    @ApiPropertyOptional({ example: 30, description: 'Tempo estimado em minutos' })
    @IsOptional() @IsNumber() @Min(1) estimatedTime?: number;
}
