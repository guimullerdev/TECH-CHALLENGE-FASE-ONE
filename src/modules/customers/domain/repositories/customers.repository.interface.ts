import { Customer } from "../entities/customers.entity";

export interface CustomerRepository {
    findById(id: string): Promise<Customer | null>;
    create(customer: Customer): Promise<Customer>;
    // findByEmail(email: string): Promise<Customer | null>;
    // save(customer: Customer): Promise<void>;
    // delete(id: string): Promise<void>;
}