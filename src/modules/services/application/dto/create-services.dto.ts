import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateServicoDto {
    @ApiProperty({ example: 'Troca de óleo' })
    @IsNotEmpty()
    @IsString()
    nome: string;

    @ApiProperty({ example: 150.00, description: 'Preço base em reais' })
    @IsNumber()
    @Min(0)
    precoBase: number;

    @ApiPropertyOptional({ example: 'Troca de óleo mineral 5W30 com filtro' })
    @IsOptional()
    @IsString()
    descricao?: string;

    @ApiPropertyOptional({ example: 60, description: 'Tempo estimado de execução em minutos' })
    @IsOptional()
    @IsInt()
    @Min(1)
    tempoEstimado?: number;
}
