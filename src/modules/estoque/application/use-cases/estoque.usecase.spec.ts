import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { EntradaEstoqueUseCase } from './entrada-estoque.usecase';
import { ReservarEstoqueUseCase } from './reservar-estoque.usecase';
import { LiberarReservaUseCase } from './liberar-reserva.usecase';
import { BaixaEstoqueUseCase } from './baixa-estoque.usecase';
import { ListarMovimentacoesUseCase } from './listar-movimentacoes.usecase';
import { Peca } from '../../../parts/domain/entities/parts.entity';
import { MovimentacaoEstoque, TipoMovimentacao } from '../../domain/entities/movimentacao-estoque.entity';
import type { IMovimentacaoEstoqueRepository } from '../../domain/repositories/movimentacao-estoque.repository.interface';
import type { IPecaRepository } from '../../../parts/domain/repositories/parts.repository.interface';

const mockMovRepo = (): jest.Mocked<IMovimentacaoEstoqueRepository> => ({
    create: jest.fn(),
    findByPecaId: jest.fn(),
    findByOsId: jest.fn(),
});

const mockPecaRepo = (): jest.Mocked<IPecaRepository> => ({
    findById: jest.fn(),
    findByCodigo: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
});

const makePeca = (qtdTotal = 10, qtdDisponivel = 10, qtdReservada = 0) =>
    Peca.restore({
        id: 'p-1',
        nome: 'Filtro',
        precoUnitario: 25,
        qtdTotal,
        qtdDisponivel,
        qtdReservada,
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

const makeMov = (tipo = TipoMovimentacao.ENTRADA) =>
    MovimentacaoEstoque.restore({
        id: 'mov-1',
        pecaId: 'p-1',
        tipo,
        quantidade: 5,
        createdAt: new Date(),
    });

// ─── EntradaEstoqueUseCase ───────────────────────────────────────────────────
describe('EntradaEstoqueUseCase', () => {
    it('adds stock and creates movimentacao', async () => {
        const movRepo = mockMovRepo();
        const pecaRepo = mockPecaRepo();
        pecaRepo.findById.mockResolvedValue(makePeca());
        pecaRepo.update.mockResolvedValue(makePeca(15, 15));
        movRepo.create.mockImplementation(async (m) => m);

        const useCase = new EntradaEstoqueUseCase(movRepo as any, pecaRepo as any);
        const result = await useCase.execute({ pecaId: 'p-1', quantidade: 5 });

        expect(pecaRepo.update).toHaveBeenCalledTimes(1);
        expect(movRepo.create).toHaveBeenCalledTimes(1);
        expect(result.tipo).toBe(TipoMovimentacao.ENTRADA);
    });

    it('throws NotFoundException if peca not found', async () => {
        const movRepo = mockMovRepo();
        const pecaRepo = mockPecaRepo();
        pecaRepo.findById.mockResolvedValue(null);

        const useCase = new EntradaEstoqueUseCase(movRepo as any, pecaRepo as any);
        await expect(useCase.execute({ pecaId: 'missing', quantidade: 5 })).rejects.toThrow(NotFoundException);
    });
});

// ─── ReservarEstoqueUseCase ──────────────────────────────────────────────────
describe('ReservarEstoqueUseCase', () => {
    it('reserves stock and creates movimentacao', async () => {
        const movRepo = mockMovRepo();
        const pecaRepo = mockPecaRepo();
        pecaRepo.findById.mockResolvedValue(makePeca(10, 10, 0));
        pecaRepo.update.mockResolvedValue(makePeca(10, 5, 5));
        movRepo.create.mockImplementation(async (m) => m);

        const useCase = new ReservarEstoqueUseCase(movRepo as any, pecaRepo as any);
        const result = await useCase.execute({ pecaId: 'p-1', quantidade: 5 });

        expect(movRepo.create).toHaveBeenCalledTimes(1);
        expect(result.tipo).toBe(TipoMovimentacao.RESERVA);
    });

    it('throws NotFoundException if peca not found', async () => {
        const movRepo = mockMovRepo();
        const pecaRepo = mockPecaRepo();
        pecaRepo.findById.mockResolvedValue(null);

        const useCase = new ReservarEstoqueUseCase(movRepo as any, pecaRepo as any);
        await expect(useCase.execute({ pecaId: 'missing', quantidade: 5 })).rejects.toThrow(NotFoundException);
    });

    it('throws UnprocessableEntityException if insufficient stock', async () => {
        const movRepo = mockMovRepo();
        const pecaRepo = mockPecaRepo();
        pecaRepo.findById.mockResolvedValue(makePeca(10, 3, 7));

        const useCase = new ReservarEstoqueUseCase(movRepo as any, pecaRepo as any);
        await expect(useCase.execute({ pecaId: 'p-1', quantidade: 5 })).rejects.toThrow(UnprocessableEntityException);
    });
});

// ─── LiberarReservaUseCase ───────────────────────────────────────────────────
describe('LiberarReservaUseCase', () => {
    it('releases reservation and creates movimentacao', async () => {
        const movRepo = mockMovRepo();
        const pecaRepo = mockPecaRepo();
        pecaRepo.findById.mockResolvedValue(makePeca(10, 5, 5));
        pecaRepo.update.mockResolvedValue(makePeca(10, 10, 0));
        movRepo.create.mockImplementation(async (m) => m);

        const useCase = new LiberarReservaUseCase(movRepo as any, pecaRepo as any);
        const result = await useCase.execute({ pecaId: 'p-1', quantidade: 5 });

        expect(movRepo.create).toHaveBeenCalledTimes(1);
        expect(result.tipo).toBe(TipoMovimentacao.LIBERACAO_RESERVA);
    });

    it('throws NotFoundException if peca not found', async () => {
        const movRepo = mockMovRepo();
        const pecaRepo = mockPecaRepo();
        pecaRepo.findById.mockResolvedValue(null);

        const useCase = new LiberarReservaUseCase(movRepo as any, pecaRepo as any);
        await expect(useCase.execute({ pecaId: 'missing', quantidade: 5 })).rejects.toThrow(NotFoundException);
    });
});

// ─── BaixaEstoqueUseCase ─────────────────────────────────────────────────────
describe('BaixaEstoqueUseCase', () => {
    it('reduces stock (direct) and creates movimentacao', async () => {
        const movRepo = mockMovRepo();
        const pecaRepo = mockPecaRepo();
        pecaRepo.findById.mockResolvedValue(makePeca(10, 10, 0));
        pecaRepo.update.mockResolvedValue(makePeca(5, 5, 0));
        movRepo.create.mockImplementation(async (m) => m);

        const useCase = new BaixaEstoqueUseCase(movRepo as any, pecaRepo as any);
        const result = await useCase.execute({ pecaId: 'p-1', quantidade: 5 });

        expect(movRepo.create).toHaveBeenCalledTimes(1);
        expect(result.tipo).toBe(TipoMovimentacao.BAIXA);
    });

    it('reduces stock from reservation when fromReservation=true', async () => {
        const movRepo = mockMovRepo();
        const pecaRepo = mockPecaRepo();
        pecaRepo.findById.mockResolvedValue(makePeca(10, 5, 5));
        pecaRepo.update.mockResolvedValue(makePeca(5, 5, 0));
        movRepo.create.mockImplementation(async (m) => m);

        const useCase = new BaixaEstoqueUseCase(movRepo as any, pecaRepo as any);
        const result = await useCase.execute({ pecaId: 'p-1', quantidade: 5, fromReservation: true });

        expect(result.tipo).toBe(TipoMovimentacao.BAIXA);
        const updatedPeca = pecaRepo.update.mock.calls[0][0] as Peca;
        expect(updatedPeca.qtdReservada).toBe(0);
    });

    it('throws NotFoundException if peca not found', async () => {
        const movRepo = mockMovRepo();
        const pecaRepo = mockPecaRepo();
        pecaRepo.findById.mockResolvedValue(null);

        const useCase = new BaixaEstoqueUseCase(movRepo as any, pecaRepo as any);
        await expect(useCase.execute({ pecaId: 'missing', quantidade: 5 })).rejects.toThrow(NotFoundException);
    });

    it('throws UnprocessableEntityException if stock insufficient', async () => {
        const movRepo = mockMovRepo();
        const pecaRepo = mockPecaRepo();
        pecaRepo.findById.mockResolvedValue(makePeca(3, 3, 0));

        const useCase = new BaixaEstoqueUseCase(movRepo as any, pecaRepo as any);
        await expect(useCase.execute({ pecaId: 'p-1', quantidade: 5 })).rejects.toThrow(UnprocessableEntityException);
    });
});

// ─── ListarMovimentacoesUseCase ──────────────────────────────────────────────
describe('ListarMovimentacoesUseCase', () => {
    it('returns movements by pecaId', async () => {
        const repo = mockMovRepo();
        repo.findByPecaId.mockResolvedValue([makeMov()]);

        const useCase = new ListarMovimentacoesUseCase(repo as any);
        const result = await useCase.execute('p-1');

        expect(repo.findByPecaId).toHaveBeenCalledWith('p-1');
        expect(result).toHaveLength(1);
    });
});
