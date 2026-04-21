import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { PartsModule } from '../parts/parts.module';
import { MOVIMENTACAO_ESTOQUE_REPOSITORY } from './domain/repositories/movimentacao-estoque.repository.interface';
import { MovimentacaoEstoquePrismaRepository } from './infrastructure/repositories/movimentacao-estoque-prisma.repository';
import { EstoqueController } from './presentation/estoque.controller';
import { EntradaEstoqueUseCase } from './application/use-cases/entrada-estoque.usecase';
import { BaixaEstoqueUseCase } from './application/use-cases/baixa-estoque.usecase';
import { ReservarEstoqueUseCase } from './application/use-cases/reservar-estoque.usecase';
import { LiberarReservaUseCase } from './application/use-cases/liberar-reserva.usecase';
import { ListarMovimentacoesUseCase } from './application/use-cases/listar-movimentacoes.usecase';

@Module({
    imports: [PrismaModule, PartsModule],
    controllers: [EstoqueController],
    providers: [
        EntradaEstoqueUseCase,
        BaixaEstoqueUseCase,
        ReservarEstoqueUseCase,
        LiberarReservaUseCase,
        ListarMovimentacoesUseCase,
        {
            provide: MOVIMENTACAO_ESTOQUE_REPOSITORY,
            useClass: MovimentacaoEstoquePrismaRepository,
        },
    ],
    exports: [
        MOVIMENTACAO_ESTOQUE_REPOSITORY,
        EntradaEstoqueUseCase,
        BaixaEstoqueUseCase,
        ReservarEstoqueUseCase,
        LiberarReservaUseCase,
    ],
})
export class EstoqueModule {}
