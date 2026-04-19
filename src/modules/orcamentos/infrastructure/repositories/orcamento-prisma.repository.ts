import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { IOrcamentoRepository } from '../../domain/repositories/orcamento.repository.interface';
import { OrcamentoMapper } from '../mappers/orcamento.mapper';
import { Orcamento } from '../../domain/entities/orcamento.entity';

@Injectable()
export class OrcamentoPrismaRepository implements IOrcamentoRepository {
    constructor(private prisma: PrismaService) {}

    async create(orcamento: Orcamento): Promise<Orcamento> {
        const raw = await this.prisma.orcamento.create({ data: OrcamentoMapper.toPrisma(orcamento) });
        return OrcamentoMapper.toDomain(raw);
    }

    async findById(id: string): Promise<Orcamento | null> {
        const raw = await this.prisma.orcamento.findUnique({ where: { id } });
        if (!raw) return null;
        return OrcamentoMapper.toDomain(raw);
    }

    async findByOsId(osId: string): Promise<Orcamento | null> {
        const raw = await this.prisma.orcamento.findUnique({ where: { osId } });
        if (!raw) return null;
        return OrcamentoMapper.toDomain(raw);
    }

    async update(orcamento: Orcamento): Promise<Orcamento> {
        const raw = await this.prisma.orcamento.update({
            where: { id: orcamento.id },
            data: OrcamentoMapper.toPrisma(orcamento),
        });
        return OrcamentoMapper.toDomain(raw);
    }
}
