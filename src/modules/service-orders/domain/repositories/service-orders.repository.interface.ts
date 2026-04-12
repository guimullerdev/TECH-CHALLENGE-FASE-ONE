import { ServiceOrder } from "../entities/service-orders.entity";
export interface ServiceOrderRepository {
    findById(id: string): Promise<ServiceOrder | null>;
    create(serviceOrder: ServiceOrder): Promise<void>;
    // findByEmail(email: string): Promise<Customer | null>;
    // save(customer: Customer): Promise<void>;
    // delete(id: string): Promise<void>;
}