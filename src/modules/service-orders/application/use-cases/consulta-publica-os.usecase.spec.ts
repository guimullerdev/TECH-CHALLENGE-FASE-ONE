import { NotFoundException } from '@nestjs/common';
import { ConsultaPublicaOsUseCase } from './consulta-publica-os.usecase';

const makeOsPrisma = (overrides: Record<string, unknown> = {}) => ({
    numero: 'OS-2024-000001',
    status: 'RECEBIDA',
    dataAbertura: new Date('2024-01-01'),
    cliente: { documento: '12345678901' },
    veiculo: { placa: 'ABC-1234', marca: 'Toyota', modelo: 'Corolla' },
    orcamento: null,
    ...overrides,
});

const makePrisma = (findFirstResult: unknown) => ({
    ordemDeServico: { findFirst: jest.fn().mockResolvedValue(findFirstResult) },
});

describe('ConsultaPublicaOsUseCase', () => {
    it('returns OS data when numero and documento match', async () => {
        const raw = makeOsPrisma();
        const prisma = makePrisma(raw);
        const useCase = new ConsultaPublicaOsUseCase(prisma as any);

        const result = await useCase.execute('OS-2024-000001', '123.456.789-01');

        expect(result.numero).toBe('OS-2024-000001');
        expect(result.status).toBe('RECEBIDA');
        expect(result.veiculo.placa).toBe('ABC-1234');
        expect(result.orcamento).toBeUndefined();
    });

    it('includes orcamento when present', async () => {
        const raw = makeOsPrisma({
            orcamento: { valorTotal: '350.00', status: 'ENVIADO' },
        });
        const prisma = makePrisma(raw);
        const useCase = new ConsultaPublicaOsUseCase(prisma as any);

        const result = await useCase.execute('OS-2024-000001', '12345678901');

        expect(result.orcamento).toBeDefined();
        expect(result.orcamento!.valorTotal).toBe(350);
        expect(result.orcamento!.status).toBe('ENVIADO');
    });

    it('throws NotFoundException when OS not found', async () => {
        const prisma = makePrisma(null);
        const useCase = new ConsultaPublicaOsUseCase(prisma as any);

        await expect(useCase.execute('OS-9999', '12345678901')).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException when documento does not match', async () => {
        const raw = makeOsPrisma();
        const prisma = makePrisma(raw);
        const useCase = new ConsultaPublicaOsUseCase(prisma as any);

        await expect(useCase.execute('OS-2024-000001', '99999999999')).rejects.toThrow(NotFoundException);
    });
});
