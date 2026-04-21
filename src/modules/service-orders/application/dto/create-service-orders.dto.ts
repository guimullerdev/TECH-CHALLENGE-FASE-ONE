import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateOsDto {
    @ApiProperty({ example: 'a3e4f5b6-1234-5678-9abc-def012345678', description: 'UUID do cliente' })
    @IsNotEmpty()
    @IsUUID()
    clienteId: string;

    @ApiProperty({ example: 'b4f5a6c7-2345-6789-abcd-ef0123456789', description: 'UUID do veículo' })
    @IsNotEmpty()
    @IsUUID()
    veiculoId: string;

    @ApiPropertyOptional({ example: 'Veículo apresenta barulho ao frear e luz do motor acesa' })
    @IsOptional()
    @IsString()
    descricaoProblema?: string;
}
