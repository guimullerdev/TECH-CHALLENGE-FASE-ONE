import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

import { CustomerRepository } from "../../domain/repositories/customers.repository.interface";
import { CustomerMapper } from "../mappers/customers.mapper";
import { Customer } from "../../domain/entities/customers.entity";

@Injectable()
export class CustomerPrismaRepository implements CustomerRepository {
    constructor(private prisma: PrismaService) { }

    async findById(id: string): Promise<Customer | null> {
        const raw = await this.prisma.customer.findUnique({ where: { id } });
        if (!raw) return null;
        return CustomerMapper.toDomain(raw);
    }

    async findAll(): Promise<Customer[]> {
        const raws = await this.prisma.customer.findMany({ orderBy: { createdAt: 'desc' } });
        return raws.map(CustomerMapper.toDomain);
    }

    async create(customer: Customer): Promise<Customer> {
        const raw = await this.prisma.customer.create({ data: CustomerMapper.toPrisma(customer) });
        return CustomerMapper.toDomain(raw);
    }

    async save(customer: Customer): Promise<Customer> {
        const raw = await this.prisma.customer.update({
            where: { id: customer.id },
            data: CustomerMapper.toPrisma(customer),
        });
        return CustomerMapper.toDomain(raw);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.customer.delete({ where: { id } });
    }
}