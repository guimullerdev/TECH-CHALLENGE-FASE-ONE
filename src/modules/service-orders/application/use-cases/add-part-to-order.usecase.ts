import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { PECA_REPOSITORY, IPecaRepository } from '../../../parts/domain/repositories/parts.repository.interface';
import { ReservarEstoqueUseCase } from '../../../estoque/application/use-cases/reservar-estoque.usecase';
import { OrdemDeServico } from '../../domain/entities/service-orders.entity';

@Injectable()
export class AddPecaToOsUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly osRepo: IOrdemDeServicoRepository,
        @Inject(PECA_REPOSITORY)
        private readonly pecaRepo: IPecaRepository,
        private readonly reservarEstoqueUseCase: ReservarEstoqueUseCase,
    ) {}

    async execute(osId: string, pecaId: string, quantidade: number): Promise<OrdemDeServico> {
        const os = await this.osRepo.findById(osId);
        if (!os) throw new NotFoundException(`Ordem de serviço ${osId} não encontrada`);

        const peca = await this.pecaRepo.findById(pecaId);
        if (!peca) throw new NotFoundException(`Peça ${pecaId} não encontrada`);

        let updated: OrdemDeServico;
        try {
            updated = os.addPeca({
                id: crypto.randomUUID(),
                pecaId,
                quantidade,
                valorUnitario: peca.precoUnitario,
                status: 'reservada',
            });
        } catch (err: any) {
            throw new ConflictException(err.message);
        }

        await this.reservarEstoqueUseCase.execute({
            pecaId,
            quantidade,
            osId,
            observacao: `Reserva automática para OS ${os.numero}`,
        });

        return this.osRepo.update(updated);
    }
}
