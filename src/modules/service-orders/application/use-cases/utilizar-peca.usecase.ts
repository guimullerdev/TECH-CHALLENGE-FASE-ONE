import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { BaixaEstoqueUseCase } from '../../../estoque/application/use-cases/baixa-estoque.usecase';
import { OrdemDeServico } from '../../domain/entities/service-orders.entity';

@Injectable()
export class UtilizarPecaUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly repo: IOrdemDeServicoRepository,
        private readonly baixaEstoqueUseCase: BaixaEstoqueUseCase,
    ) {}

    async execute(osId: string, itemId: string): Promise<OrdemDeServico> {
        const os = await this.repo.findById(osId);
        if (!os) throw new NotFoundException(`Ordem de serviço ${osId} não encontrada`);

        const item = os.pecas.find(p => p.id === itemId);
        if (!item) throw new NotFoundException(`Item de peça ${itemId} não encontrado na OS`);

        const updated = os.marcarPecaUtilizada(itemId);
        const saved = await this.repo.update(updated);

        await this.baixaEstoqueUseCase.execute({
            pecaId: item.pecaId,
            quantidade: item.quantidade,
            observacao: `Baixa automática por utilização na OS ${os.numero}`,
            fromReservation: true,
        });

        return saved;
    }
}
