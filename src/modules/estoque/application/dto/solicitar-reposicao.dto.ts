import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class SolicitarReposicaoDto {
    @ApiProperty({ example: 'c5d6e7f8-3456-7890-bcde-f01234567890', description: 'UUID da peça sem estoque' })
    @IsNotEmpty()
    @IsUUID()
    pecaId: string;

    @ApiPropertyOptional({ example: 'Peça esgotada após OS #2026-001' })
    @IsOptional()
    @IsString()
    observacao?: string;
}
