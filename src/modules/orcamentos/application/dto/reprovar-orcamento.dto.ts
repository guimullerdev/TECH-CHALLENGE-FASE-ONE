import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ReprovarOrcamentoDto {
    @ApiPropertyOptional({ example: 'Valor acima do esperado' })
    @IsOptional()
    @IsString()
    observacoes?: string;
}
