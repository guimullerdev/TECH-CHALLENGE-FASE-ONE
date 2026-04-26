import { OrcamentoMapper } from './orcamento.mapper';
import { Orcamento, StatusOrcamento } from '../../domain/entities/orcamento.entity';

const rawOrcamento = {
    id: 'orc-1',
    osId: 'os-1',
    status: 'GERADO',
    valorTotal: 500 as any,
    dataGeracao: new Date('2024-01-01'),
    dataEnvio: new Date('2024-01-02'),
    dataResposta: null,
    observacoes: 'Observação',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02'),
};

describe('OrcamentoMapper', () => {
    describe('toDomain()', () => {
        it('maps all fields correctly', () => {
            const orc = OrcamentoMapper.toDomain(rawOrcamento as any);
            expect(orc.id).toBe('orc-1');
            expect(orc.osId).toBe('os-1');
            expect(orc.status).toBe(StatusOrcamento.GERADO);
            expect(orc.valorTotal).toBe(500);
            expect(orc.dataEnvio).toEqual(new Date('2024-01-02'));
            expect(orc.observacoes).toBe('Observação');
        });

        it('converts null optional fields to undefined', () => {
            const orc = OrcamentoMapper.toDomain({ ...rawOrcamento, dataEnvio: null, dataResposta: null, observacoes: null } as any);
            expect(orc.dataEnvio).toBeUndefined();
            expect(orc.dataResposta).toBeUndefined();
            expect(orc.observacoes).toBeUndefined();
        });
    });

    describe('toPrisma()', () => {
        it('maps domain to prisma shape', () => {
            const orc = Orcamento.restore({ ...rawOrcamento, status: StatusOrcamento.GERADO, valorTotal: 500, dataEnvio: new Date('2024-01-02'), dataResposta: undefined });
            const prisma = OrcamentoMapper.toPrisma(orc);
            expect(prisma.id).toBe('orc-1');
            expect(prisma.osId).toBe('os-1');
            expect(prisma.status).toBe('GERADO');
            expect(prisma.observacoes).toBe('Observação');
        });

        it('converts undefined optional fields to null', () => {
            const orc = Orcamento.restore({ ...rawOrcamento, status: StatusOrcamento.GERADO, valorTotal: 500, dataEnvio: undefined, dataResposta: undefined, observacoes: undefined });
            const prisma = OrcamentoMapper.toPrisma(orc);
            expect(prisma.dataEnvio).toBeNull();
            expect(prisma.dataResposta).toBeNull();
            expect(prisma.observacoes).toBeNull();
        });
    });
});
