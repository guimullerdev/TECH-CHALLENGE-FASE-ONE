import { VeiculoMapper } from './vehicle.mapper';
import { Veiculo } from '../../domain/entities/vehicle.entity';

const rawVeiculo = {
    id: 'v-1',
    placa: 'ABC1234',
    marca: 'Toyota',
    modelo: 'Corolla',
    clienteId: 'c-1',
    ano: 2020,
    cor: 'Prata',
    kmAtual: 50000,
    ativo: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02'),
};

describe('VeiculoMapper', () => {
    describe('toDomain()', () => {
        it('maps all fields correctly', () => {
            const veiculo = VeiculoMapper.toDomain(rawVeiculo as any);
            expect(veiculo.id).toBe('v-1');
            expect(veiculo.placa).toBe('ABC1234');
            expect(veiculo.marca).toBe('Toyota');
            expect(veiculo.clienteId).toBe('c-1');
            expect(veiculo.ano).toBe(2020);
            expect(veiculo.ativo).toBe(true);
        });

        it('converts null optional fields to undefined', () => {
            const veiculo = VeiculoMapper.toDomain({ ...rawVeiculo, ano: null, cor: null, kmAtual: null } as any);
            expect(veiculo.ano).toBeUndefined();
            expect(veiculo.cor).toBeUndefined();
            expect(veiculo.kmAtual).toBeUndefined();
        });
    });

    describe('toPrisma()', () => {
        it('maps domain to prisma shape', () => {
            const veiculo = Veiculo.restore({ ...rawVeiculo });
            const prisma = VeiculoMapper.toPrisma(veiculo);
            expect(prisma.id).toBe('v-1');
            expect(prisma.placa).toBe('ABC1234');
            expect(prisma.ano).toBe(2020);
            expect(prisma.ativo).toBe(true);
        });

        it('converts undefined optional fields to null', () => {
            const veiculo = Veiculo.restore({ ...rawVeiculo, ano: undefined, cor: undefined, kmAtual: undefined });
            const prisma = VeiculoMapper.toPrisma(veiculo);
            expect(prisma.ano).toBeNull();
            expect(prisma.cor).toBeNull();
            expect(prisma.kmAtual).toBeNull();
        });
    });
});
