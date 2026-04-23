import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { PECA_REPOSITORY, IPecaRepository } from '../../../parts/domain/repositories/parts.repository.interface';
import { SolicitarReposicaoDto } from '../dto/solicitar-reposicao.dto';

export interface ReposicaoSolicitadaResponse {
    pecaId: string;
    nome: string;
    qtdTotal: number;
    qtdDisponivel: number;
    observacao?: string;
    mensagem: string;
    solicitadoEm: Date;
}

@Injectable()
export class SolicitarReposicaoUseCase {
    constructor(
        @Inject(PECA_REPOSITORY)
        private readonly pecaRepo: IPecaRepository,
    ) {}

    async execute(dto: SolicitarReposicaoDto): Promise<ReposicaoSolicitadaResponse> {
        const peca = await this.pecaRepo.findById(dto.pecaId);
        if (!peca) throw new NotFoundException(`Peça ${dto.pecaId} não encontrada`);

        if (peca.qtdTotal > 0) {
            throw new UnprocessableEntityException(
                `Peça ${peca.nome} ainda possui ${peca.qtdTotal} unidade(s) em estoque. Reposição só pode ser solicitada quando o estoque estiver zerado.`,
            );
        }

        return {
            pecaId: peca.id,
            nome: peca.nome,
            qtdTotal: peca.qtdTotal,
            qtdDisponivel: peca.qtdDisponivel,
            observacao: dto.observacao,
            mensagem: `Reposição de estoque solicitada para a peça "${peca.nome}". O setor de compras foi notificado.`,
            solicitadoEm: new Date(),
        };
    }
}
