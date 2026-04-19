import { MovimentacaoEstoque } from '../entities/movimentacao-estoque.entity';

export interface IMovimentacaoEstoqueRepository {
    create(movimentacao: MovimentacaoEstoque): Promise<MovimentacaoEstoque>;
    findByPecaId(pecaId: string): Promise<MovimentacaoEstoque[]>;
    findByOsId(osId: string): Promise<MovimentacaoEstoque[]>;
}

export const MOVIMENTACAO_ESTOQUE_REPOSITORY = Symbol('IMovimentacaoEstoqueRepository');
