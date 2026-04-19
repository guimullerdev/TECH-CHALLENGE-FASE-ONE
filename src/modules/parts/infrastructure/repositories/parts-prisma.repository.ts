import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { IPecaRepository } from '../../domain/repositories/parts.repository.interface';
import { PecaMapper } from '../mappers/parts.mapper';
import { Peca } from '../../domain/entities/parts.entity';

@Injectable()
export class PecaPrismaRepository implements IPecaRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: string): Promise<Peca | null> {
        const raw = await this.prisma.peca.findUnique({ where: { id } });
        if (!raw) return null;
        return PecaMapper.toDomain(raw);
    }

    async findByCodigo(codigo: string): Promise<Peca | null> {
        const raw = await this.prisma.peca.findUnique({ where: { codigo } });
        if (!raw) return null;
        return PecaMapper.toDomain(raw);
    }

    async findAll(filters?: { ativo?: boolean; disponivel?: boolean }): Promise<Peca[]> {
        const raws = await this.prisma.peca.findMany({
            where: {
                ...(filters?.ativo !== undefined ? { ativo: filters.ativo } : {}),
                ...(filters?.disponivel ? { qtdDisponivel: { gt: 0 } } : {}),
            },
            orderBy: { nome: 'asc' },
        });
        return raws.map(PecaMapper.toDomain);
    }

    async create(peca: Peca): Promise<Peca> {
        const raw = await this.prisma.peca.create({ data: PecaMapper.toPrisma(peca) });
        return PecaMapper.toDomain(raw);
    }

    async update(peca: Peca): Promise<Peca> {
        const raw = await this.prisma.peca.update({
            where: { id: peca.id },
            data: PecaMapper.toPrisma(peca),
        });
        return PecaMapper.toDomain(raw);
    }
}
