import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CLIENTE_REPOSITORY, IClienteRepository } from '../../domain/repositories/customers.repository.interface';
import { Cliente } from '../../domain/entities/customers.entity';

@Injectable()
export class GetClienteUseCase {
    constructor(
        @Inject(CLIENTE_REPOSITORY)
        private readonly repo: IClienteRepository,
    ) {}

    async execute(id: string): Promise<Cliente> {
        const cliente = await this.repo.findById(id);
        if (!cliente) throw new NotFoundException(`Cliente ${id} não encontrado`);
        return cliente;
    }

    async executeAll(filters?: { id?: string; cpf?: string; nome?: string; ativo?: boolean }): Promise<Cliente[]> {
        if (filters?.id) {
            const c = await this.repo.findById(filters.id);
            return c ? [c] : [];
        }
        if (filters?.cpf) {
            const c = await this.repo.findByCpf(filters.cpf);
            return c ? [c] : [];
        }
        if (filters?.nome) {
            return this.repo.findByNome(filters.nome);
        }
        return this.repo.findAll({ ativo: filters?.ativo });
    }
}
