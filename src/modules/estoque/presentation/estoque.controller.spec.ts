import { Test, TestingModule } from '@nestjs/testing';
import { EstoqueController } from './estoque.controller';
import { EntradaEstoqueUseCase } from '../application/use-cases/entrada-estoque.usecase';
import { BaixaEstoqueUseCase } from '../application/use-cases/baixa-estoque.usecase';
import { ReservarEstoqueUseCase } from '../application/use-cases/reservar-estoque.usecase';
import { LiberarReservaUseCase } from '../application/use-cases/liberar-reserva.usecase';
import { ListarMovimentacoesUseCase } from '../application/use-cases/listar-movimentacoes.usecase';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

const uc = () => ({ execute: jest.fn().mockResolvedValue({}) });

describe('EstoqueController', () => {
    let controller: EstoqueController;
    let entradaUC: { execute: jest.Mock };
    let baixaUC: { execute: jest.Mock };
    let reservarUC: { execute: jest.Mock };
    let liberarUC: { execute: jest.Mock };
    let listarUC: { execute: jest.Mock };

    beforeEach(async () => {
        entradaUC = uc();
        baixaUC = uc();
        reservarUC = uc();
        liberarUC = uc();
        listarUC = { execute: jest.fn().mockResolvedValue([]) };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [EstoqueController],
            providers: [
                { provide: EntradaEstoqueUseCase, useValue: entradaUC },
                { provide: BaixaEstoqueUseCase, useValue: baixaUC },
                { provide: ReservarEstoqueUseCase, useValue: reservarUC },
                { provide: LiberarReservaUseCase, useValue: liberarUC },
                { provide: ListarMovimentacoesUseCase, useValue: listarUC },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<EstoqueController>(EstoqueController);
    });

    it('entrada delegates to EntradaEstoqueUseCase', async () => {
        const dto = { pecaId: 'p-1', quantidade: 5 };
        await controller.entrada(dto);
        expect(entradaUC.execute).toHaveBeenCalledWith(dto);
    });

    it('baixa delegates to BaixaEstoqueUseCase', async () => {
        const dto = { pecaId: 'p-1', quantidade: 3 };
        await controller.baixa(dto);
        expect(baixaUC.execute).toHaveBeenCalledWith(dto);
    });

    it('reservar delegates to ReservarEstoqueUseCase', async () => {
        const dto = { pecaId: 'p-1', quantidade: 2 };
        await controller.reservar(dto);
        expect(reservarUC.execute).toHaveBeenCalledWith(dto);
    });

    it('liberarReserva delegates to LiberarReservaUseCase', async () => {
        const dto = { pecaId: 'p-1', quantidade: 2 };
        await controller.liberarReserva(dto);
        expect(liberarUC.execute).toHaveBeenCalledWith(dto);
    });

    it('movimentacoes delegates to ListarMovimentacoesUseCase', async () => {
        await controller.movimentacoes('p-1');
        expect(listarUC.execute).toHaveBeenCalledWith('p-1');
    });
});
