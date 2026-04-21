import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { MOVIMENTACAO_ESTOQUE_REPOSITORY, IMovimentacaoEstoqueRepository } from '../../domain/repositories/movimentacao-estoque.repository.interface';
import { PECA_REPOSITORY, IPecaRepository } from '../../../parts/domain/repositories/parts.repository.interface';
import { MovimentacaoEstoque, TipoMovimentacao } from '../../domain/entities/movimentacao-estoque.entity';
import { Peca } from '../../../parts/domain/entities/parts.entity';
import { BaixaEstoqueDto } from '../dto/baixa-estoque.dto';

@Injectable()
export class BaixaEstoqueUseCase {
    constructor(
        @Inject(MOVIMENTACAO_ESTOQUE_REPOSITORY)
        private readonly movRepo: IMovimentacaoEstoqueRepository,
        @Inject(PECA_REPOSITORY)
        private readonly pecaRepo: IPecaRepository,
    ) {}

    async execute(dto: BaixaEstoqueDto): Promise<MovimentacaoEstoque> {
        const peca = await this.pecaRepo.findById(dto.pecaId);
        if (!peca) throw new NotFoundException(`Peça ${dto.pecaId} não encontrada`);

        if (peca.qtdTotal < dto.quantidade) {
            throw new UnprocessableEntityException(
                `Estoque insuficiente para a peça ${dto.pecaId}: total ${peca.qtdTotal}, solicitado ${dto.quantidade}`,
            );
        }

        const fromReservation = dto.fromReservation === true;
        const updatedPeca = Peca.restore({
            id: peca.id,
            nome: peca.nome,
            precoUnitario: peca.precoUnitario,
            qtdTotal: peca.qtdTotal - dto.quantidade,
            qtdDisponivel: fromReservation ? peca.qtdDisponivel : Math.max(0, peca.qtdDisponivel - dto.quantidade),
            qtdReservada: fromReservation ? Math.max(0, peca.qtdReservada - dto.quantidade) : peca.qtdReservada,
            codigo: peca.codigo,
            descricao: peca.descricao,
            ativo: peca.ativo,
            createdAt: peca.createdAt,
            updatedAt: new Date(),
        });
        await this.pecaRepo.update(updatedPeca);

        const mov = MovimentacaoEstoque.create({
            pecaId: dto.pecaId,
            tipo: TipoMovimentacao.BAIXA,
            quantidade: dto.quantidade,
            observacao: dto.observacao,
        });
        return this.movRepo.create(mov);
    }
}
