import { ServiceOrder } from '../../domain/entities/service-orders.entity';

export class AddPartResponseDto {
    order: ServiceOrder;
    stockAvailable: boolean;
    stockQty: number;
}
