import { ConflictException, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { SERVICO_REPOSITORY, IServicoRepository } from '../../../services/domain/repositories/services.repository';
import { OrdemDeServico } from '../../domain/entities/service-orders.entity';

@Injectable()
export class AddServicoToOsUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly osRepo: IOrdemDeServicoRepository,
        @Inject(SERVICO_REPOSITORY)
        private readonly servicoRepo: IServicoRepository,
    ) {}

    async execute(osId: string, servicoId: string): Promise<OrdemDeServico> {
        const os = await this.osRepo.findById(osId);
        if (!os) throw new NotFoundException(`Ordem de serviço ${osId} não encontrada`);

        const servico = await this.servicoRepo.findById(servicoId);
        if (!servico) throw new NotFoundException(`Serviço ${servicoId} não encontrado`);
        if (!servico.ativo) throw new UnprocessableEntityException('Não é possível adicionar um serviço inativo à OS');

        let updated: OrdemDeServico;
        try {
            updated = os.addServico({
                id: crypto.randomUUID(),
                servicoId,
                precoUnitario: servico.precoBase,
                status: 'pendente',
            });
        } catch (err: any) {
            throw new ConflictException(err.message);
        }

        return this.osRepo.update(updated);
    }
}
