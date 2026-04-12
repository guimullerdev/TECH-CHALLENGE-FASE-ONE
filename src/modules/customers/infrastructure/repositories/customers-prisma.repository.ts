import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

import { CustomerRepository } from "../../domain/repositories/customers.repository.interface";
import { CustomerMapper } from "../mappers/customers.mapper";
import { Customer } from "../../domain/entities/customers.entity";

@Injectable()
export class CustomerPrismaRepository implements CustomerRepository {
    constructor(private prisma: PrismaService) { }

    async findById(id: string) {
        const raw = await this.prisma.customer.findUnique({ where: { id } });
        if (!raw) return null;
        return CustomerMapper.toDomain(raw);
    }

    async create(customer: Customer): Promise<Customer> {
        const raw = await this.prisma.customer.create({ data: customer });
        return CustomerMapper.toDomain(raw);
    }
}