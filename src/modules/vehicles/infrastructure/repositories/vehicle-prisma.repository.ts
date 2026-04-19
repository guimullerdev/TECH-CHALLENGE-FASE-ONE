import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { IVeiculoRepository } from '../../domain/repositories/vehicle.repository.interface';
import { VeiculoMapper } from '../mappers/vehicle.mapper';
import { Veiculo } from '../../domain/entities/vehicle.entity';

@Injectable()
export class VeiculoPrismaRepository implements IVeiculoRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: string): Promise<Veiculo | null> {
        const raw = await this.prisma.veiculo.findUnique({ where: { id } });
        if (!raw) return null;
        return VeiculoMapper.toDomain(raw);
    }

    async findByPlaca(placa: string): Promise<Veiculo | null> {
        const raw = await this.prisma.veiculo.findUnique({ where: { placa } });
        if (!raw) return null;
        return VeiculoMapper.toDomain(raw);
    }

    async findAll(filters?: { clienteId?: string; placa?: string; ativo?: boolean }): Promise<Veiculo[]> {
        const raws = await this.prisma.veiculo.findMany({
            where: {
                ...(filters?.clienteId ? { clienteId: filters.clienteId } : {}),
                ...(filters?.placa ? { placa: { contains: filters.placa, mode: 'insensitive' } } : {}),
                ...(filters?.ativo !== undefined ? { ativo: filters.ativo } : {}),
            },
            orderBy: { placa: 'asc' },
        });
        return raws.map(VeiculoMapper.toDomain);
    }

    async create(veiculo: Veiculo): Promise<Veiculo> {
        const raw = await this.prisma.veiculo.create({ data: VeiculoMapper.toPrisma(veiculo) });
        return VeiculoMapper.toDomain(raw);
    }

    async update(veiculo: Veiculo): Promise<Veiculo> {
        const raw = await this.prisma.veiculo.update({
            where: { id: veiculo.id },
            data: VeiculoMapper.toPrisma(veiculo),
        });
        return VeiculoMapper.toDomain(raw);
    }
}
