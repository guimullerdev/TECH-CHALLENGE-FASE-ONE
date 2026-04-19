import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { IClienteRepository } from '../../domain/repositories/customers.repository.interface';
import { ClienteMapper } from '../mappers/customers.mapper';
import { Cliente } from '../../domain/entities/customers.entity';

@Injectable()
export class ClientePrismaRepository implements IClienteRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: string): Promise<Cliente | null> {
        const raw = await this.prisma.cliente.findUnique({ where: { id } });
        if (!raw) return null;
        return ClienteMapper.toDomain(raw);
    }

    async findByCpf(cpf: string): Promise<Cliente | null> {
        const raw = await this.prisma.cliente.findUnique({ where: { cpf } });
        if (!raw) return null;
        return ClienteMapper.toDomain(raw);
    }

    async findByNome(nome: string): Promise<Cliente[]> {
        const raws = await this.prisma.cliente.findMany({
            where: { nome: { contains: nome, mode: 'insensitive' } },
            orderBy: { nome: 'asc' },
        });
        return raws.map(ClienteMapper.toDomain);
    }

    async findAll(filters?: { ativo?: boolean }): Promise<Cliente[]> {
        const raws = await this.prisma.cliente.findMany({
            where: filters?.ativo !== undefined ? { ativo: filters.ativo } : undefined,
            orderBy: { nome: 'asc' },
        });
        return raws.map(ClienteMapper.toDomain);
    }

    async create(cliente: Cliente): Promise<Cliente> {
        const raw = await this.prisma.cliente.create({ data: ClienteMapper.toPrisma(cliente) });
        return ClienteMapper.toDomain(raw);
    }

    async update(cliente: Cliente): Promise<Cliente> {
        const raw = await this.prisma.cliente.update({
            where: { id: cliente.id },
            data: ClienteMapper.toPrisma(cliente),
        });
        return ClienteMapper.toDomain(raw);
    }
}
