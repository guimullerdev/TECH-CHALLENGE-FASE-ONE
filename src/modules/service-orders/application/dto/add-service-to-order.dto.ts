import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddServiceToOrderDto {
    @IsUUID()
    @IsNotEmpty()
    serviceId: string;
}
