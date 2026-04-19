import { Orcamento } from '../entities/orcamento.entity';

export interface IOrcamentoRepository {
    create(orcamento: Orcamento): Promise<Orcamento>;
    findById(id: string): Promise<Orcamento | null>;
    findByOsId(osId: string): Promise<Orcamento | null>;
    update(orcamento: Orcamento): Promise<Orcamento>;
}

export const ORCAMENTO_REPOSITORY = Symbol('IOrcamentoRepository');
