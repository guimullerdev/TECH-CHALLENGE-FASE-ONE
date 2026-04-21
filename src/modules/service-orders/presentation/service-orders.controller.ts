import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

import { CreateOrdemDeServicoUseCase } from '../application/use-cases/create-service-orders.usecase';
import { GetOrdemDeServicoUseCase } from '../application/use-cases/get-service-orders.usecase';
import { AddServicoToOsUseCase } from '../application/use-cases/add-service-to-order.usecase';
import { RemoveServicoFromOsUseCase } from '../application/use-cases/remove-service-from-order.usecase';
import { AddPecaToOsUseCase } from '../application/use-cases/add-part-to-order.usecase';
import { RemovePecaFromOsUseCase } from '../application/use-cases/remove-part-from-order.usecase';
import { StartDiagnosisUseCase } from '../application/use-cases/start-diagnosis.usecase';
import { FinishDiagnosisUseCase } from '../application/use-cases/finish-diagnosis.usecase';
import { IniciarExecucaoUseCase } from '../application/use-cases/iniciar-execucao.usecase';
import { RealizarServicoUseCase } from '../application/use-cases/realizar-servico.usecase';
import { UtilizarPecaUseCase } from '../application/use-cases/utilizar-peca.usecase';
import { FinishOrderUseCase } from '../application/use-cases/finish-order.usecase';
import { LiberarVeiculoUseCase } from '../application/use-cases/liberar-veiculo.usecase';
import { DeliverOrderUseCase } from '../application/use-cases/deliver-order.usecase';

import { CreateOsDto } from '../application/dto/create-service-orders.dto';
import { AddServicoDto } from '../application/dto/add-service-to-order.dto';
import { AddPecaDto } from '../application/dto/add-part-to-order.dto';
import { RealizarServicoDto } from '../application/dto/realizar-servico.dto';
import { StatusOS } from '../domain/entities/service-orders.entity';

@ApiTags('os')
@ApiBearerAuth()
@Controller('os')
export class ServiceOrdersController {
    constructor(
        private readonly createOsUseCase: CreateOrdemDeServicoUseCase,
        private readonly getOsUseCase: GetOrdemDeServicoUseCase,
        private readonly addServicoUseCase: AddServicoToOsUseCase,
        private readonly removeServicoUseCase: RemoveServicoFromOsUseCase,
        private readonly addPecaUseCase: AddPecaToOsUseCase,
        private readonly removePecaUseCase: RemovePecaFromOsUseCase,
        private readonly startDiagnosisUseCase: StartDiagnosisUseCase,
        private readonly finishDiagnosisUseCase: FinishDiagnosisUseCase,
        private readonly iniciarExecucaoUseCase: IniciarExecucaoUseCase,
        private readonly realizarServicoUseCase: RealizarServicoUseCase,
        private readonly utilizarPecaUseCase: UtilizarPecaUseCase,
        private readonly finishOrderUseCase: FinishOrderUseCase,
        private readonly liberarVeiculoUseCase: LiberarVeiculoUseCase,
        private readonly deliverOrderUseCase: DeliverOrderUseCase,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Abrir nova ordem de serviço' })
    @ApiResponse({ status: 201, description: 'OS criada com status RECEBIDA' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    create(@Body() dto: CreateOsDto) {
        return this.createOsUseCase.execute(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar ordens de serviço com filtros opcionais' })
    @ApiQuery({ name: 'status', required: false, enum: StatusOS })
    @ApiQuery({ name: 'clienteId', required: false })
    @ApiQuery({ name: 'veiculoId', required: false })
    @ApiResponse({ status: 200, description: 'Lista de OS' })
    findAll(
        @Query('status') status?: StatusOS,
        @Query('clienteId') clienteId?: string,
        @Query('veiculoId') veiculoId?: string,
    ) {
        return this.getOsUseCase.executeAll({ status, clienteId, veiculoId });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar OS por ID' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 200, description: 'OS encontrada com itens' })
    @ApiResponse({ status: 404, description: 'OS não encontrada' })
    findOne(@Param('id') id: string) {
        return this.getOsUseCase.execute(id);
    }

    @Post(':id/servicos')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Adicionar serviço à OS' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 201, description: 'Serviço adicionado' })
    @ApiResponse({ status: 404, description: 'OS ou serviço não encontrado' })
    @ApiResponse({ status: 409, description: 'Serviço já adicionado à OS' })
    addServico(@Param('id') id: string, @Body() dto: AddServicoDto) {
        return this.addServicoUseCase.execute(id, dto.servicoId);
    }

    @Delete(':id/servicos/:itemId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Remover serviço da OS' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiParam({ name: 'itemId', description: 'servicoId do item' })
    @ApiResponse({ status: 200, description: 'Serviço removido' })
    @ApiResponse({ status: 404, description: 'OS ou serviço não encontrado na OS' })
    removeServico(@Param('id') id: string, @Param('itemId') itemId: string) {
        return this.removeServicoUseCase.execute(id, itemId);
    }

    @Post(':id/pecas')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Adicionar peça à OS' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 201, description: 'Peça adicionada; estoque reservado' })
    @ApiResponse({ status: 400, description: 'Quantidade < 1' })
    @ApiResponse({ status: 404, description: 'OS ou peça não encontrada' })
    @ApiResponse({ status: 422, description: 'Estoque disponível insuficiente' })
    addPeca(@Param('id') id: string, @Body() dto: AddPecaDto) {
        return this.addPecaUseCase.execute(id, dto.pecaId, dto.quantidade);
    }

    @Delete(':id/pecas/:itemId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Remover peça da OS' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiParam({ name: 'itemId', description: 'pecaId do item' })
    @ApiResponse({ status: 200, description: 'Peça removida; reserva liberada' })
    @ApiResponse({ status: 404, description: 'OS ou peça não encontrada na OS' })
    removePeca(@Param('id') id: string, @Param('itemId') itemId: string) {
        return this.removePecaUseCase.execute(id, itemId);
    }

    @Patch(':id/iniciar-diagnostico')
    @ApiOperation({ summary: 'Iniciar diagnóstico (RECEBIDA → EM_DIAGNOSTICO)' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 200, description: 'Status atualizado para EM_DIAGNOSTICO' })
    @ApiResponse({ status: 422, description: 'Transição inválida' })
    startDiagnosis(@Param('id') id: string) {
        return this.startDiagnosisUseCase.execute(id);
    }

    @Patch(':id/concluir-diagnostico')
    @ApiOperation({ summary: 'Concluir diagnóstico (EM_DIAGNOSTICO → AGUARDANDO_APROVACAO)' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 200, description: 'Status atualizado; orçamento gerado automaticamente' })
    @ApiResponse({ status: 422, description: 'Transição inválida' })
    finishDiagnosis(@Param('id') id: string) {
        return this.finishDiagnosisUseCase.execute(id);
    }

    @Patch(':id/iniciar-execucao')
    @ApiOperation({ summary: 'Iniciar execução (APROVADA → EM_EXECUCAO)' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 200, description: 'Status atualizado para EM_EXECUCAO' })
    @ApiResponse({ status: 422, description: 'Transição inválida' })
    iniciarExecucao(@Param('id') id: string) {
        return this.iniciarExecucaoUseCase.execute(id);
    }

    @Patch(':id/servicos/:itemId/realizar')
    @ApiOperation({ summary: 'Registrar execução de serviço' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiParam({ name: 'itemId', description: 'ID do item de serviço' })
    @ApiResponse({ status: 200, description: 'Execução registrada' })
    realizarServico(
        @Param('id') id: string,
        @Param('itemId') itemId: string,
        @Body() dto: RealizarServicoDto,
    ) {
        return this.realizarServicoUseCase.execute(id, itemId, new Date(dto.inicio), new Date(dto.fim));
    }

    @Patch(':id/pecas/:itemId/utilizar')
    @ApiOperation({ summary: 'Marcar peça como utilizada e registrar baixa' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiParam({ name: 'itemId', description: 'ID do item de peça' })
    @ApiResponse({ status: 200, description: 'Peça marcada como utilizada; baixa registrada' })
    utilizarPeca(@Param('id') id: string, @Param('itemId') itemId: string) {
        return this.utilizarPecaUseCase.execute(id, itemId);
    }

    @Patch(':id/finalizar-execucao')
    @ApiOperation({ summary: 'Finalizar execução (EM_EXECUCAO → FINALIZADA)' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 200, description: 'Execução finalizada' })
    @ApiResponse({ status: 422, description: 'Transição inválida' })
    finalizarExecucao(@Param('id') id: string) {
        return this.finishOrderUseCase.execute(id);
    }

    @Patch(':id/liberar-veiculo')
    @ApiOperation({ summary: 'Liberar veículo (pass-through, OS permanece FINALIZADA)' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 200, description: 'Veículo liberado' })
    liberarVeiculo(@Param('id') id: string) {
        return this.liberarVeiculoUseCase.execute(id);
    }

    @Patch(':id/entregar')
    @ApiOperation({ summary: 'Entregar veículo (FINALIZADA → ENTREGUE)' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 200, description: 'Veículo entregue; OS em estado final' })
    @ApiResponse({ status: 422, description: 'Transição inválida' })
    entregar(@Param('id') id: string) {
        return this.deliverOrderUseCase.execute(id);
    }
}
