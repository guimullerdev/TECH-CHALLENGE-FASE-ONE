import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { LiberarReservaUseCase } from '../../../estoque/application/use-cases/liberar-reserva.usecase';
import { OrdemDeServico } from '../../domain/entities/service-orders.entity';

@Injectable()
export class RemovePecaFromOsUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly osRepo: IOrdemDeServicoRepository,
        private readonly liberarReservaUseCase: LiberarReservaUseCase,
    ) {}

    async execute(osId: string, pecaId: string): Promise<OrdemDeServico> {
        const os = await this.osRepo.findById(osId);
        if (!os) throw new NotFoundException(`Ordem de serviço ${osId} não encontrada`);

        const item = os.pecas.find(p => p.pecaId === pecaId);
        if (!item) throw new NotFoundException(`Peça ${pecaId} não encontrada na OS`);

        await this.liberarReservaUseCase.execute({
            pecaId,
            quantidade: item.quantidade,
            osId,
            observacao: `Liberação por remoção de peça da OS ${os.numero}`,
        });

        const updated = os.removePeca(pecaId);
        return this.osRepo.update(updated);
    }
}
