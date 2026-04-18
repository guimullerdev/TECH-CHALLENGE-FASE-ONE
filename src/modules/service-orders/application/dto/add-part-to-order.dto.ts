import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class AddPartToOrderDto {
    @ApiProperty({ example: 'c5d6e7f8-3456-7890-bcde-f01234567890', description: 'UUID da peça a adicionar' })
    @IsUUID()
    @IsNotEmpty()
    partId: string;

    @ApiProperty({ example: 2, description: 'Quantidade (mínimo 1)' })
    @IsInt()
    @Min(1)
    quantity: number;
}
