import { ClienteMapper } from './customers.mapper';
import { Cliente } from '../../domain/entities/customers.entity';

const rawCliente = {
    id: 'c-1',
    nome: 'João Silva',
    documento: '52998224725',
    tipoDocumento: 'CPF' as any,
    telefone: '11999999999',
    email: 'joao@test.com',
    endereco: 'Rua A, 1',
    ativo: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02'),
};

describe('ClienteMapper', () => {
    describe('toDomain()', () => {
        it('maps all fields correctly', () => {
            const cliente = ClienteMapper.toDomain(rawCliente as any);
            expect(cliente.id).toBe('c-1');
            expect(cliente.nome).toBe('João Silva');
            expect(cliente.documento).toBe('52998224725');
            expect(cliente.tipoDocumento).toBe('CPF');
            expect(cliente.telefone).toBe('11999999999');
            expect(cliente.email).toBe('joao@test.com');
            expect(cliente.ativo).toBe(true);
        });

        it('converts null optional fields to undefined', () => {
            const cliente = ClienteMapper.toDomain({ ...rawCliente, telefone: null, email: null, endereco: null } as any);
            expect(cliente.telefone).toBeUndefined();
            expect(cliente.email).toBeUndefined();
            expect(cliente.endereco).toBeUndefined();
        });
    });

    describe('toPrisma()', () => {
        it('maps domain to prisma shape', () => {
            const cliente = Cliente.restore({ ...rawCliente });
            const prisma = ClienteMapper.toPrisma(cliente);
            expect(prisma.id).toBe('c-1');
            expect(prisma.nome).toBe('João Silva');
            expect(prisma.documento).toBe('52998224725');
            expect(prisma.tipoDocumento).toBe('CPF');
            expect(prisma.telefone).toBe('11999999999');
            expect(prisma.ativo).toBe(true);
        });

        it('converts undefined optional fields to null', () => {
            const cliente = Cliente.restore({ ...rawCliente, telefone: undefined, email: undefined, endereco: undefined });
            const prisma = ClienteMapper.toPrisma(cliente);
            expect(prisma.telefone).toBeNull();
            expect(prisma.email).toBeNull();
            expect(prisma.endereco).toBeNull();
        });
    });
});
