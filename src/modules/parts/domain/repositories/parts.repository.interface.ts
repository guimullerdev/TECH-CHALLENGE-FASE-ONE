import { Peca } from '../entities/parts.entity';

export interface IPecaRepository {
    findById(id: string): Promise<Peca | null>;
    findByCodigo(codigo: string): Promise<Peca | null>;
    findAll(filters?: { ativo?: boolean; disponivel?: boolean }): Promise<Peca[]>;
    create(peca: Peca): Promise<Peca>;
    update(peca: Peca): Promise<Peca>;
}

export const PECA_REPOSITORY = Symbol('IPecaRepository');
