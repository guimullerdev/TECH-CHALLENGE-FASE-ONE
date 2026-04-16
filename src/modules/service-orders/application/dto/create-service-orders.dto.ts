import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateServiceOrderDto {
    @ApiProperty({ example: 'a3e4f5b6-1234-5678-9abc-def012345678', description: 'UUID do cliente' })
    @IsUUID()
    @IsNotEmpty()
    customerId: string;

    @ApiProperty({ example: 'b4f5a6c7-2345-6789-abcd-ef0123456789', description: 'UUID do veículo' })
    @IsUUID()
    @IsNotEmpty()
    vehicleId: string;

    @ApiProperty({ example: 'Veículo apresenta barulho ao frear e luz do motor acesa' })
    @IsString()
    @IsNotEmpty()
    description: string;
}
