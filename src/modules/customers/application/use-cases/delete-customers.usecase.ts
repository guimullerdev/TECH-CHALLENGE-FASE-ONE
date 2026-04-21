import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CLIENTE_REPOSITORY, IClienteRepository } from '../../domain/repositories/customers.repository.interface';
import { Cliente } from '../../domain/entities/customers.entity';

@Injectable()
export class DeactivateClienteUseCase {
    constructor(
        @Inject(CLIENTE_REPOSITORY)
        private readonly repo: IClienteRepository,
    ) {}

    async execute(id: string): Promise<Cliente> {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException(`Cliente ${id} não encontrado`);
        const deactivated = existing.deactivate();
        return this.repo.update(deactivated);
    }
}
