import { Inject, Injectable } from "@nestjs/common";

import { CreateCustomerDto } from "../dto/create-customers.dto";
import { Customer } from "../../domain/entities/customers.entity";
import type { CustomerRepository } from "../../domain/repositories/customers.repository.interface";

@Injectable()
export class CreateCustomerUseCase {
    constructor(
        @Inject('CustomerRepository')
        private readonly repo: CustomerRepository
    ) { }

    async execute(dto: CreateCustomerDto) {
        const customer = Customer.create(dto);
        return await this.repo.create(customer);
    }
}