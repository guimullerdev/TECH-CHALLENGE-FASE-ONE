import { TempoMedioServicosUseCase } from './tempo-medio-servicos.usecase';

const makeItem = (servicoId: string, nome: string, inicioExec: Date, fimExec: Date) => ({
    servicoId,
    servico: { nome },
    inicioExec,
    fimExec,
});

const makePrisma = (items: unknown[]) => ({
    osItemServico: {
        findMany: jest.fn().mockResolvedValue(items),
    },
});

describe('TempoMedioServicosUseCase', () => {
    it('returns empty array when no items', async () => {
        const prisma = makePrisma([]);
        const useCase = new TempoMedioServicosUseCase(prisma as any);

        const result = await useCase.execute();
        expect(result).toEqual([]);
    });

    it('aggregates single service execution correctly', async () => {
        const inicio = new Date('2024-01-01T08:00:00');
        const fim = new Date('2024-01-01T10:00:00'); // 120 min
        const prisma = makePrisma([makeItem('svc-1', 'Troca de óleo', inicio, fim)]);
        const useCase = new TempoMedioServicosUseCase(prisma as any);

        const result = await useCase.execute();
        expect(result).toHaveLength(1);
        expect(result[0].servicoId).toBe('svc-1');
        expect(result[0].servicoNome).toBe('Troca de óleo');
        expect(result[0].qtdExecucoes).toBe(1);
        expect(result[0].tempoMedioMinutos).toBe(120);
        expect(result[0].tempoMinMinutos).toBe(120);
        expect(result[0].tempoMaxMinutos).toBe(120);
    });

    it('calculates avg/min/max over multiple executions of same service', async () => {
        const items = [
            makeItem('svc-1', 'Revisão', new Date('2024-01-01T08:00:00'), new Date('2024-01-01T09:00:00')), // 60 min
            makeItem('svc-1', 'Revisão', new Date('2024-01-01T10:00:00'), new Date('2024-01-01T12:00:00')), // 120 min
            makeItem('svc-1', 'Revisão', new Date('2024-01-01T14:00:00'), new Date('2024-01-01T15:30:00')), // 90 min
        ];
        const prisma = makePrisma(items);
        const useCase = new TempoMedioServicosUseCase(prisma as any);

        const result = await useCase.execute();
        expect(result).toHaveLength(1);
        expect(result[0].qtdExecucoes).toBe(3);
        expect(result[0].tempoMedioMinutos).toBe(90);
        expect(result[0].tempoMinMinutos).toBe(60);
        expect(result[0].tempoMaxMinutos).toBe(120);
    });

    it('groups different services separately', async () => {
        const items = [
            makeItem('svc-1', 'Troca de óleo', new Date('2024-01-01T08:00:00'), new Date('2024-01-01T09:00:00')),
            makeItem('svc-2', 'Alinhamento', new Date('2024-01-01T10:00:00'), new Date('2024-01-01T11:30:00')),
        ];
        const prisma = makePrisma(items);
        const useCase = new TempoMedioServicosUseCase(prisma as any);

        const result = await useCase.execute();
        expect(result).toHaveLength(2);
    });
});
