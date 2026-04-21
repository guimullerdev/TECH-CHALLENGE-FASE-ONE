import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { MOVIMENTACAO_ESTOQUE_REPOSITORY, IMovimentacaoEstoqueRepository } from '../../domain/repositories/movimentacao-estoque.repository.interface';
import { PECA_REPOSITORY, IPecaRepository } from '../../../parts/domain/repositories/parts.repository.interface';
import { MovimentacaoEstoque, TipoMovimentacao } from '../../domain/entities/movimentacao-estoque.entity';
import { Peca } from '../../../parts/domain/entities/parts.entity';
import { ReservarEstoqueDto } from '../dto/reservar-estoque.dto';

@Injectable()
export class ReservarEstoqueUseCase {
    constructor(
        @Inject(MOVIMENTACAO_ESTOQUE_REPOSITORY)
        private readonly movRepo: IMovimentacaoEstoqueRepository,
        @Inject(PECA_REPOSITORY)
        private readonly pecaRepo: IPecaRepository,
    ) {}

    async execute(dto: ReservarEstoqueDto): Promise<MovimentacaoEstoque> {
        const peca = await this.pecaRepo.findById(dto.pecaId);
        if (!peca) throw new NotFoundException(`Peça ${dto.pecaId} não encontrada`);

        if (peca.qtdDisponivel < dto.quantidade) {
            throw new UnprocessableEntityException(
                `Estoque insuficiente para a peça ${dto.pecaId}: disponível ${peca.qtdDisponivel}, solicitado ${dto.quantidade}`,
            );
        }

        const updatedPeca = Peca.restore({
            id: peca.id,
            nome: peca.nome,
            precoUnitario: peca.precoUnitario,
            qtdTotal: peca.qtdTotal,
            qtdDisponivel: peca.qtdDisponivel - dto.quantidade,
            qtdReservada: peca.qtdReservada + dto.quantidade,
            codigo: peca.codigo,
            descricao: peca.descricao,
            ativo: peca.ativo,
            createdAt: peca.createdAt,
            updatedAt: new Date(),
        });
        await this.pecaRepo.update(updatedPeca);

        const mov = MovimentacaoEstoque.create({
            pecaId: dto.pecaId,
            tipo: TipoMovimentacao.RESERVA,
            quantidade: dto.quantidade,
            osId: dto.osId,
            observacao: dto.observacao,
        });
        return this.movRepo.create(mov);
    }
}
