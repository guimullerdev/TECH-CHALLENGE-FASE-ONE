import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { IMovimentacaoEstoqueRepository } from '../../domain/repositories/movimentacao-estoque.repository.interface';
import { MovimentacaoEstoqueMapper } from '../mappers/movimentacao-estoque.mapper';
import { MovimentacaoEstoque } from '../../domain/entities/movimentacao-estoque.entity';

@Injectable()
export class MovimentacaoEstoquePrismaRepository implements IMovimentacaoEstoqueRepository {
    constructor(private prisma: PrismaService) {}

    async create(movimentacao: MovimentacaoEstoque): Promise<MovimentacaoEstoque> {
        const raw = await this.prisma.movimentacaoEstoque.create({
            data: MovimentacaoEstoqueMapper.toPrisma(movimentacao),
        });
        return MovimentacaoEstoqueMapper.toDomain(raw);
    }

    async findByPecaId(pecaId: string): Promise<MovimentacaoEstoque[]> {
        const raws = await this.prisma.movimentacaoEstoque.findMany({
            where: { pecaId },
            orderBy: { createdAt: 'desc' },
        });
        return raws.map(MovimentacaoEstoqueMapper.toDomain);
    }

    async findByOsId(osId: string): Promise<MovimentacaoEstoque[]> {
        const raws = await this.prisma.movimentacaoEstoque.findMany({
            where: { osId },
            orderBy: { createdAt: 'desc' },
        });
        return raws.map(MovimentacaoEstoqueMapper.toDomain);
    }
}
