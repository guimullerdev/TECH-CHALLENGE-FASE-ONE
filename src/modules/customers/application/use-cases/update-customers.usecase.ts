import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CLIENTE_REPOSITORY, IClienteRepository } from '../../domain/repositories/customers.repository.interface';
import { Cliente } from '../../domain/entities/customers.entity';
import { UpdateClienteDto } from '../dto/update-customers.dto';

@Injectable()
export class UpdateClienteUseCase {
    constructor(
        @Inject(CLIENTE_REPOSITORY)
        private readonly repo: IClienteRepository,
    ) {}

    async execute(id: string, dto: UpdateClienteDto): Promise<Cliente> {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException(`Cliente ${id} não encontrado`);
        const updated = existing.update({
            nome: dto.nome,
            telefone: dto.telefone,
            email: dto.email,
            endereco: dto.endereco,
        });
        return this.repo.update(updated);
    }
}
