import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import type { CustomerRepository } from "../../domain/repositories/customers.repository.interface";
import { UpdateCustomerDto } from "../dto/update-customers.dto";

@Injectable()
export class UpdateCustomerUseCase {
    constructor(
        @Inject('CustomerRepository')
        private readonly repo: CustomerRepository
    ) { }

    async execute(id: string, dto: UpdateCustomerDto) {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException(`Cliente ${id} não encontrado`);
        const updated = existing.update(dto);
        return this.repo.save(updated);
    }
}
