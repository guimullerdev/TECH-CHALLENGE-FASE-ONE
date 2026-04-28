import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { CLIENTE_REPOSITORY, IClienteRepository } from '../../domain/repositories/customers.repository.interface';
import { Cliente } from '../../domain/entities/customers.entity';
import { CreateClienteDto } from '../dto/create-customers.dto';

@Injectable()
export class CreateClienteUseCase {
    constructor(
        @Inject(CLIENTE_REPOSITORY)
        private readonly repo: IClienteRepository,
    ) {}

    async execute(dto: CreateClienteDto): Promise<Cliente> {
        const existing = await this.repo.findByDocumento(dto.documento);
        if (existing) throw new ConflictException(`Documento ${dto.documento} já cadastrado`);
        const cliente = Cliente.create({
            nome: dto.nome,
            documento: dto.documento,
            telefone: dto.telefone,
            email: dto.email,
            endereco: dto.endereco,
        });
        return this.repo.create(cliente);
    }
}
