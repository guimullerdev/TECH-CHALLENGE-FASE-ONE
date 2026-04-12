import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateServiceOrderDto {
    @IsUUID()
    @IsNotEmpty()
    customerId: string;

    @IsUUID()
    @IsNotEmpty()
    vehicleId: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}