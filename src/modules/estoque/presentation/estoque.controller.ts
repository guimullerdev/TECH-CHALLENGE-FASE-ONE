import { Controller, Post, Get, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

import { EntradaEstoqueUseCase } from '../application/use-cases/entrada-estoque.usecase';
import { BaixaEstoqueUseCase } from '../application/use-cases/baixa-estoque.usecase';
import { ReservarEstoqueUseCase } from '../application/use-cases/reservar-estoque.usecase';
import { LiberarReservaUseCase } from '../application/use-cases/liberar-reserva.usecase';
import { ListarMovimentacoesUseCase } from '../application/use-cases/listar-movimentacoes.usecase';
import { SolicitarReposicaoUseCase } from '../application/use-cases/solicitar-reposicao.usecase';

import { EntradaEstoqueDto } from '../application/dto/entrada-estoque.dto';
import { BaixaEstoqueDto } from '../application/dto/baixa-estoque.dto';
import { ReservarEstoqueDto } from '../application/dto/reservar-estoque.dto';
import { LiberarReservaDto } from '../application/dto/liberar-reserva.dto';
import { SolicitarReposicaoDto } from '../application/dto/solicitar-reposicao.dto';

@ApiTags('estoque')
@ApiBearerAuth()
@Controller('estoque')
export class EstoqueController {
    constructor(
        private readonly entradaEstoqueUseCase: EntradaEstoqueUseCase,
        private readonly baixaEstoqueUseCase: BaixaEstoqueUseCase,
        private readonly reservarEstoqueUseCase: ReservarEstoqueUseCase,
        private readonly liberarReservaUseCase: LiberarReservaUseCase,
        private readonly listarMovimentacoesUseCase: ListarMovimentacoesUseCase,
        private readonly solicitarReposicaoUseCase: SolicitarReposicaoUseCase,
    ) {}

    @Post('entrada')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Registrar entrada de estoque' })
    @ApiResponse({ status: 201, description: 'Entrada registrada' })
    @ApiResponse({ status: 404, description: 'Peça não encontrada' })
    entrada(@Body() dto: EntradaEstoqueDto) {
        return this.entradaEstoqueUseCase.execute(dto);
    }

    @Post('baixa')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Registrar baixa de estoque' })
    @ApiResponse({ status: 201, description: 'Baixa registrada' })
    @ApiResponse({ status: 404, description: 'Peça não encontrada' })
    @ApiResponse({ status: 422, description: 'Estoque insuficiente' })
    baixa(@Body() dto: BaixaEstoqueDto) {
        return this.baixaEstoqueUseCase.execute(dto);
    }

    @Post('reservar')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Reservar estoque para uma OS' })
    @ApiResponse({ status: 201, description: 'Estoque reservado' })
    @ApiResponse({ status: 404, description: 'Peça não encontrada' })
    @ApiResponse({ status: 422, description: 'Estoque disponível insuficiente' })
    reservar(@Body() dto: ReservarEstoqueDto) {
        return this.reservarEstoqueUseCase.execute(dto);
    }

    @Post('liberar-reserva')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Liberar reserva de estoque' })
    @ApiResponse({ status: 201, description: 'Reserva liberada' })
    @ApiResponse({ status: 404, description: 'Peça não encontrada' })
    liberarReserva(@Body() dto: LiberarReservaDto) {
        return this.liberarReservaUseCase.execute(dto);
    }

    @Post('solicitar-reposicao')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Solicitar reposição de estoque (apenas quando qtd_total = 0)' })
    @ApiResponse({ status: 201, description: 'Reposição solicitada com sucesso' })
    @ApiResponse({ status: 404, description: 'Peça não encontrada' })
    @ApiResponse({ status: 422, description: 'Peça ainda possui estoque disponível' })
    solicitarReposicao(@Body() dto: SolicitarReposicaoDto) {
        return this.solicitarReposicaoUseCase.execute(dto);
    }

    @Get('movimentacoes')
    @ApiOperation({ summary: 'Listar movimentações por peça' })
    @ApiQuery({ name: 'pecaId', required: true, description: 'UUID da peça' })
    @ApiResponse({ status: 200, description: 'Lista de movimentações' })
    movimentacoes(@Query('pecaId') pecaId: string) {
        return this.listarMovimentacoesUseCase.execute(pecaId);
    }
}
