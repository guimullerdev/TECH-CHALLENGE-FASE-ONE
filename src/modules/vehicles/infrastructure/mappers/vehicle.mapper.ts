import { Veiculo as PrismaVeiculo } from '@prisma/client';
import { Veiculo } from '../../domain/entities/vehicle.entity';

export class VeiculoMapper {
    static toDomain(raw: PrismaVeiculo): Veiculo {
        return Veiculo.restore({
            id: raw.id,
            placa: raw.placa,
            marca: raw.marca,
            modelo: raw.modelo,
            clienteId: raw.clienteId,
            ano: raw.ano ?? undefined,
            cor: raw.cor ?? undefined,
            kmAtual: raw.kmAtual ?? undefined,
            ativo: raw.ativo,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }

    static toPrisma(veiculo: Veiculo): Omit<PrismaVeiculo, never> {
        return {
            id: veiculo.id,
            placa: veiculo.placa,
            marca: veiculo.marca,
            modelo: veiculo.modelo,
            clienteId: veiculo.clienteId,
            ano: veiculo.ano ?? null,
            cor: veiculo.cor ?? null,
            kmAtual: veiculo.kmAtual ?? null,
            ativo: veiculo.ativo,
            createdAt: veiculo.createdAt,
            updatedAt: veiculo.updatedAt,
        };
    }
}
