import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { CLIENTE_REPOSITORY, IClienteRepository } from '../../domain/repositories/customers.repository.interface';
import { Cliente } from '../../domain/entities/customers.entity';
import { PrismaService } from '../../../../prisma/prisma.service';
import { StatusOS as PrismaStatusOS } from '@prisma/client';

const TERMINAL_STATUSES: PrismaStatusOS[] = [PrismaStatusOS.ENTREGUE, PrismaStatusOS.REPROVADA];

@Injectable()
export class DeactivateClienteUseCase {
    constructor(
        @Inject(CLIENTE_REPOSITORY)
        private readonly repo: IClienteRepository,
        private readonly prisma: PrismaService,
    ) {}

    async execute(id: string): Promise<Cliente> {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException(`Cliente ${id} não encontrado`);

        const osAberta = await this.prisma.ordemDeServico.findFirst({
            where: { clienteId: id, status: { notIn: TERMINAL_STATUSES } },
            select: { numero: true },
        });

        if (osAberta) {
            throw new UnprocessableEntityException(
                `Cliente possui a OS ${osAberta.numero} em aberto. Conclua todas as ordens antes de desativar.`,
            );
        }

        const deactivated = existing.deactivate();
        return this.repo.update(deactivated);
    }
}
