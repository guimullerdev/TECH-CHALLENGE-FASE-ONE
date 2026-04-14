import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import type { CustomerRepository } from "../../domain/repositories/customers.repository.interface";

@Injectable()
export class DeleteCustomerUseCase {
    constructor(
        @Inject('CustomerRepository')
        private readonly repo: CustomerRepository
    ) { }

    async execute(id: string): Promise<void> {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException(`Cliente ${id} não encontrado`);
        await this.repo.delete(id);
    }
}
