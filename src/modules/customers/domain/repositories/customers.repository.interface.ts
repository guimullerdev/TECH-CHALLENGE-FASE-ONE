import { Customer } from "../entities/customers.entity";

export interface CustomerRepository {
    findById(id: string): Promise<Customer | null>;
    findAll(): Promise<Customer[]>;
    create(customer: Customer): Promise<Customer>;
    save(customer: Customer): Promise<Customer>;
    delete(id: string): Promise<void>;
}