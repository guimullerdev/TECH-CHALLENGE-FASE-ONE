import { Customer as PrismaCustomer } from '@prisma/client';

import { Customer } from '../../domain/entities/customers.entity';

export class CustomerMapper {
    static toDomain(raw: PrismaCustomer): Customer {
        return Customer.restore({
            id: raw.id,
            name: raw.name,
            email: raw.email,
            createdAt: raw.createdAt,
            document: raw.document,
            phone: raw.phone,
        });
    }

    static toPrisma(customer: Customer): PrismaCustomer {
        return {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            createdAt: customer.createdAt,
            document: customer.document,
            phone: customer.phone,
        };
    }
}