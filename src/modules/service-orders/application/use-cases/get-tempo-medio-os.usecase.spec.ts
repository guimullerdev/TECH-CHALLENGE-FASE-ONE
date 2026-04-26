import { NotFoundException } from '@nestjs/common';
import { GetTempoMedioOsUseCase } from './get-tempo-medio-os.usecase';
import { OrdemDeServico, StatusOS } from '../../domain/entities/service-orders.entity';
import type { IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';

const mockRepo = (): jest.Mocked<IOrdemDeServicoRepository> => ({
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    generateNumero: jest.fn(),
});

const makeOsFinalizada = (abertura: Date, fechamento: Date) =>
    OrdemDeServico.restore({
        id: crypto.randomUUID(),
        numero: 'OS-001',
        clienteId: 'c-1',
        veiculoId: 'v-1',
        status: StatusOS.FINALIZADA,
        servicos: [],
        pecas: [],
        historicoStatus: [],
        dataAbertura: abertura,
        dataFechamento: fechamento,
        createdAt: abertura,
        updatedAt: fechamento,
    });

describe('GetTempoMedioOsUseCase', () => {
    it('returns zeros when no finalized OS exist', async () => {
        const repo = mockRepo();
        repo.findAll.mockResolvedValue([]);

        const useCase = new GetTempoMedioOsUseCase(repo as any);
        const result = await useCase.execute();

        expect(result.totalOsConsideradas).toBe(0);
        expect(result.tempoMedioEmHoras).toBe(0);
        expect(result.tempoMedioEmMinutos).toBe(0);
    });

    it('calculates average duration correctly for one OS', async () => {
        const repo = mockRepo();
        const abertura = new Date('2024-01-01T08:00:00Z');
        const fechamento = new Date('2024-01-01T10:00:00Z'); // 2h
        repo.findAll.mockResolvedValue([makeOsFinalizada(abertura, fechamento)]);

        const useCase = new GetTempoMedioOsUseCase(repo as any);
        const result = await useCase.execute();

        expect(result.totalOsConsideradas).toBe(1);
        expect(result.tempoMedioEmHoras).toBe(2);
        expect(result.tempoMedioEmMinutos).toBe(120);
    });

    it('averages multiple OS durations', async () => {
        const repo = mockRepo();
        const os1 = makeOsFinalizada(
            new Date('2024-01-01T08:00:00Z'),
            new Date('2024-01-01T10:00:00Z'), // 2h
        );
        const os2 = makeOsFinalizada(
            new Date('2024-01-02T08:00:00Z'),
            new Date('2024-01-02T12:00:00Z'), // 4h
        );
        repo.findAll.mockResolvedValue([os1, os2]);

        const useCase = new GetTempoMedioOsUseCase(repo as any);
        const result = await useCase.execute();

        expect(result.totalOsConsideradas).toBe(2);
        expect(result.tempoMedioEmHoras).toBe(3); // (2+4)/2
        expect(result.tempoMedioEmMinutos).toBe(180);
    });

    it('excludes OS without dataFechamento', async () => {
        const repo = mockRepo();
        const semFechamento = OrdemDeServico.restore({
            id: 'os-aberta',
            numero: 'OS-002',
            clienteId: 'c-1',
            veiculoId: 'v-1',
            status: StatusOS.FINALIZADA,
            servicos: [],
            pecas: [],
            historicoStatus: [],
            dataAbertura: new Date('2024-01-01T08:00:00Z'),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const comFechamento = makeOsFinalizada(
            new Date('2024-01-02T08:00:00Z'),
            new Date('2024-01-02T09:00:00Z'), // 1h
        );
        repo.findAll.mockResolvedValue([semFechamento, comFechamento]);

        const useCase = new GetTempoMedioOsUseCase(repo as any);
        const result = await useCase.execute();

        expect(result.totalOsConsideradas).toBe(1);
        expect(result.tempoMedioEmHoras).toBe(1);
    });

    it('applies dataInicio filter', async () => {
        const repo = mockRepo();
        const antiga = makeOsFinalizada(
            new Date('2024-01-01T08:00:00Z'),
            new Date('2024-01-01T10:00:00Z'),
        );
        const recente = makeOsFinalizada(
            new Date('2024-06-01T08:00:00Z'),
            new Date('2024-06-01T12:00:00Z'), // 4h
        );
        repo.findAll.mockResolvedValue([antiga, recente]);

        const useCase = new GetTempoMedioOsUseCase(repo as any);
        const result = await useCase.execute({ dataInicio: new Date('2024-03-01') });

        expect(result.totalOsConsideradas).toBe(1);
        expect(result.tempoMedioEmHoras).toBe(4);
    });

    it('applies dataFim filter', async () => {
        const repo = mockRepo();
        const antiga = makeOsFinalizada(
            new Date('2024-01-01T08:00:00Z'),
            new Date('2024-01-01T10:00:00Z'), // 2h
        );
        const recente = makeOsFinalizada(
            new Date('2024-06-01T08:00:00Z'),
            new Date('2024-06-01T12:00:00Z'),
        );
        repo.findAll.mockResolvedValue([antiga, recente]);

        const useCase = new GetTempoMedioOsUseCase(repo as any);
        const result = await useCase.execute({ dataFim: new Date('2024-03-01') });

        expect(result.totalOsConsideradas).toBe(1);
        expect(result.tempoMedioEmHoras).toBe(2);
    });

    it('includes filter dates in response', async () => {
        const repo = mockRepo();
        repo.findAll.mockResolvedValue([]);

        const useCase = new GetTempoMedioOsUseCase(repo as any);
        const dataInicio = new Date('2024-01-01');
        const result = await useCase.execute({ dataInicio });

        expect(result.filtros.dataInicio).toBe(dataInicio.toISOString());
        expect(result.filtros.dataFim).toBeUndefined();
    });
});
