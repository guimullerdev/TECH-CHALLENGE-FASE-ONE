import { Cliente } from '../entities/customers.entity';

export interface IClienteRepository {
    findById(id: string): Promise<Cliente | null>;
    findByCpf(cpf: string): Promise<Cliente | null>;
    findByNome(nome: string): Promise<Cliente[]>;
    findAll(filters?: { ativo?: boolean }): Promise<Cliente[]>;
    create(cliente: Cliente): Promise<Cliente>;
    update(cliente: Cliente): Promise<Cliente>;
}

export const CLIENTE_REPOSITORY = Symbol('IClienteRepository');
