import { Servico } from '../entities/services.entity';

export interface IServicoRepository {
    findById(id: string): Promise<Servico | null>;
    findAll(filters?: { ativo?: boolean }): Promise<Servico[]>;
    create(servico: Servico): Promise<Servico>;
    update(servico: Servico): Promise<Servico>;
}

export const SERVICO_REPOSITORY = Symbol('IServicoRepository');
