import { ServiceOrder } from '../../domain/entities/service-orders.entity';

export class AddPartResponseDto {
    order: ServiceOrder;
    /** true when stockQty >= quantity at the time of the request */
    stockAvailable: boolean;
    /** current stockQty after the part was added to the OS */
    stockQty: number;
}
