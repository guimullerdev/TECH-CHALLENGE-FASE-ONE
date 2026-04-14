import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import type { CustomerRepository } from "../../domain/repositories/customers.repository.interface";

@Injectable()
export class GetCustomerUseCase {
    constructor(
        @Inject('CustomerRepository')
        private readonly repo: CustomerRepository
    ) { }

    async execute(id: string) {
        const customer = await this.repo.findById(id);
        if (!customer) throw new NotFoundException(`Cliente ${id} não encontrado`);
        return customer;
    }

    async executeAll() {
        return this.repo.findAll();
    }
}
