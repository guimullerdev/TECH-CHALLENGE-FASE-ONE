import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddServicoDto {
    @ApiProperty({ example: 'd6e7f8a9-4567-8901-cdef-012345678901', description: 'UUID do serviço a adicionar' })
    @IsUUID()
    @IsNotEmpty()
    servicoId: string;
}
