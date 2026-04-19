import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { IServicoRepository } from '../../domain/repositories/services.repository';
import { ServicoMapper } from '../mappers/services.mapper';
import { Servico } from '../../domain/entities/services.entity';

@Injectable()
export class ServicoPrismaRepository implements IServicoRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string): Promise<Servico | null> {
        const raw = await this.prisma.servico.findUnique({ where: { id } });
        if (!raw) return null;
        return ServicoMapper.toDomain(raw);
    }

    async findAll(filters?: { ativo?: boolean }): Promise<Servico[]> {
        const raws = await this.prisma.servico.findMany({
            where: filters?.ativo !== undefined ? { ativo: filters.ativo } : undefined,
            orderBy: { nome: 'asc' },
        });
        return raws.map(ServicoMapper.toDomain);
    }

    async create(servico: Servico): Promise<Servico> {
        const raw = await this.prisma.servico.create({ data: ServicoMapper.toPrisma(servico) });
        return ServicoMapper.toDomain(raw);
    }

    async update(servico: Servico): Promise<Servico> {
        const raw = await this.prisma.servico.update({
            where: { id: servico.id },
            data: ServicoMapper.toPrisma(servico),
        });
        return ServicoMapper.toDomain(raw);
    }
}
