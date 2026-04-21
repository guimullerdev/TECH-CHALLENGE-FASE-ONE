import { Inject, Injectable } from '@nestjs/common';

import { MOVIMENTACAO_ESTOQUE_REPOSITORY, IMovimentacaoEstoqueRepository } from '../../domain/repositories/movimentacao-estoque.repository.interface';
import { MovimentacaoEstoque } from '../../domain/entities/movimentacao-estoque.entity';

@Injectable()
export class ListarMovimentacoesUseCase {
    constructor(
        @Inject(MOVIMENTACAO_ESTOQUE_REPOSITORY)
        private readonly repo: IMovimentacaoEstoqueRepository,
    ) {}

    async execute(pecaId: string): Promise<MovimentacaoEstoque[]> {
        return this.repo.findByPecaId(pecaId);
    }
}
