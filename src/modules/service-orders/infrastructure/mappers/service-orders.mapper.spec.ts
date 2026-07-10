import { Prisma } from '@prisma/client';
import { ServiceOrderMapper } from './service-orders.mapper';
import { StatusOS } from '../../domain/entities/service-orders.entity';

const baseRaw = {
    id: 'os-1',
    numero: 'OS-2024-000001',
    clienteId: 'cliente-1',
    veiculoId: 'veiculo-1',
    status: 'RECEBIDA' as const,
    arquivada: false,
    descricaoProblema: 'Barulho ao frear',
    dataAbertura: new Date('2024-01-01'),
    dataFechamento: null,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02'),
};

describe('ServiceOrderMapper', () => {
    describe('toDomain()', () => {
        it('maps basic fields correctly', () => {
            const os = ServiceOrderMapper.toDomain({ ...baseRaw, osItensServico: [], osItensPeca: [] });
            expect(os.id).toBe('os-1');
            expect(os.numero).toBe('OS-2024-000001');
            expect(os.clienteId).toBe('cliente-1');
            expect(os.veiculoId).toBe('veiculo-1');
            expect(os.descricaoProblema).toBe('Barulho ao frear');
            expect(os.status).toBe(StatusOS.RECEBIDA);
            expect(os.createdAt).toEqual(new Date('2024-01-01'));
        });

        it('maps osItensServico correctly', () => {
            const raw = {
                ...baseRaw,
                osItensServico: [{
                    id: 'item-s-1',
                    servicoId: 'svc-1',
                    precoUnitario: new Prisma.Decimal('100.00'),
                    inicioExec: null,
                    fimExec: null,
                }],
                osItensPeca: [],
            };
            const os = ServiceOrderMapper.toDomain(raw);
            expect(os.servicos).toHaveLength(1);
            expect(os.servicos[0].servicoId).toBe('svc-1');
            expect(os.servicos[0].precoUnitario).toBe(100);
        });

        it('maps osItensPeca correctly with utilizada=false', () => {
            const raw = {
                ...baseRaw,
                osItensServico: [],
                osItensPeca: [{
                    id: 'item-p-1',
                    pecaId: 'peca-1',
                    quantidade: 3,
                    precoUnitario: new Prisma.Decimal('50.00'),
                    utilizada: false,
                }],
            };
            const os = ServiceOrderMapper.toDomain(raw);
            expect(os.pecas).toHaveLength(1);
            expect(os.pecas[0].pecaId).toBe('peca-1');
            expect(os.pecas[0].quantidade).toBe(3);
            expect(os.pecas[0].valorUnitario).toBe(50);
            expect(os.pecas[0].status).toBe('reservada');
        });

        it('maps osItensPeca with utilizada=true to status utilizada', () => {
            const raw = {
                ...baseRaw,
                osItensServico: [],
                osItensPeca: [{
                    id: 'item-p-2',
                    pecaId: 'peca-2',
                    quantidade: 1,
                    precoUnitario: new Prisma.Decimal('30.00'),
                    utilizada: true,
                }],
            };
            const os = ServiceOrderMapper.toDomain(raw);
            expect(os.pecas[0].status).toBe('utilizada');
        });

        it('maps osItensServico with inicioExec+fimExec to status realizado', () => {
            const raw = {
                ...baseRaw,
                osItensServico: [{
                    id: 'item-s-2',
                    servicoId: 'svc-2',
                    precoUnitario: new Prisma.Decimal('200.00'),
                    inicioExec: new Date('2024-01-01T08:00:00'),
                    fimExec: new Date('2024-01-01T10:00:00'),
                }],
                osItensPeca: [],
            };
            const os = ServiceOrderMapper.toDomain(raw);
            expect(os.servicos[0].status).toBe('realizado');
            expect(os.servicos[0].inicioExec).toEqual(new Date('2024-01-01T08:00:00'));
            expect(os.servicos[0].fimExec).toEqual(new Date('2024-01-01T10:00:00'));
        });

        it('maps null descricaoProblema to undefined', () => {
            const raw = { ...baseRaw, descricaoProblema: null, osItensServico: [], osItensPeca: [] };
            const os = ServiceOrderMapper.toDomain(raw);
            expect(os.descricaoProblema).toBeUndefined();
        });

        it('maps non-null dataFechamento', () => {
            const dataFechamento = new Date('2024-06-01');
            const raw = { ...baseRaw, dataFechamento, osItensServico: [], osItensPeca: [] };
            const os = ServiceOrderMapper.toDomain(raw);
            expect(os.dataFechamento).toEqual(dataFechamento);
        });

        it('uses empty arrays when items are undefined', () => {
            const os = ServiceOrderMapper.toDomain(baseRaw as any);
            expect(os.servicos).toEqual([]);
            expect(os.pecas).toEqual([]);
        });
    });

    describe('toDomain() — arquivada', () => {
        it('maps arquivada=false correctly', () => {
            const os = ServiceOrderMapper.toDomain({ ...baseRaw, arquivada: false, osItensServico: [], osItensPeca: [] });
            expect(os.arquivada).toBe(false);
        });

        it('maps arquivada=true correctly', () => {
            const os = ServiceOrderMapper.toDomain({ ...baseRaw, arquivada: true, status: 'FINALIZADA' as const, osItensServico: [], osItensPeca: [] });
            expect(os.arquivada).toBe(true);
        });
    });

    describe('toPrisma()', () => {
        it('preserves all basic fields including arquivada', () => {
            const os = ServiceOrderMapper.toDomain({ ...baseRaw, osItensServico: [], osItensPeca: [] });
            const prisma = ServiceOrderMapper.toPrisma(os);
            expect(prisma.id).toBe('os-1');
            expect(prisma.numero).toBe('OS-2024-000001');
            expect(prisma.clienteId).toBe('cliente-1');
            expect(prisma.veiculoId).toBe('veiculo-1');
            expect(prisma.descricaoProblema).toBe('Barulho ao frear');
            expect(prisma.arquivada).toBe(false);
        });

        it('maps undefined descricaoProblema to null', () => {
            const os = ServiceOrderMapper.toDomain({ ...baseRaw, descricaoProblema: null, osItensServico: [], osItensPeca: [] });
            const prisma = ServiceOrderMapper.toPrisma(os);
            expect(prisma.descricaoProblema).toBeNull();
        });

        it('maps defined dataFechamento correctly', () => {
            const dataFechamento = new Date('2024-06-15');
            const os = ServiceOrderMapper.toDomain({ ...baseRaw, status: 'ENTREGUE' as const, dataFechamento, osItensServico: [], osItensPeca: [] });
            const prisma = ServiceOrderMapper.toPrisma(os);
            expect(prisma.dataFechamento).toEqual(dataFechamento);
        });
    });
});
