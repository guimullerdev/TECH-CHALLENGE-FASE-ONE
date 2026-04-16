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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

import { CreateServiceOrderUseCase } from '../application/use-cases/create-service-orders.usecase';
import { GetServiceOrderUseCase } from '../application/use-cases/get-service-orders.usecase';
import { UpdateServiceOrderUseCase } from '../application/use-cases/update-service-orders.usecase';
import { DeleteServiceOrderUseCase } from '../application/use-cases/delete-service-orders.usecase';
import { AddServiceToOrderUseCase } from '../application/use-cases/add-service-to-order.usecase';
import { RemoveServiceFromOrderUseCase } from '../application/use-cases/remove-service-from-order.usecase';
import { AddPartToOrderUseCase } from '../application/use-cases/add-part-to-order.usecase';
import { RemovePartFromOrderUseCase } from '../application/use-cases/remove-part-from-order.usecase';
import { StartDiagnosisUseCase } from '../application/use-cases/start-diagnosis.usecase';
import { FinishDiagnosisUseCase } from '../application/use-cases/finish-diagnosis.usecase';
import { SendBudgetUseCase } from '../application/use-cases/send-budget.usecase';
import { ApproveBudgetUseCase } from '../application/use-cases/approve-budget.usecase';
import { RejectBudgetUseCase } from '../application/use-cases/reject-budget.usecase';
import { FinishOrderUseCase } from '../application/use-cases/finish-order.usecase';
import { DeliverOrderUseCase } from '../application/use-cases/deliver-order.usecase';

import { CreateServiceOrderDto } from '../application/dto/create-service-orders.dto';
import { UpdateServiceOrderDto } from '../application/dto/update-service-orders.dto';
import { AddServiceToOrderDto } from '../application/dto/add-service-to-order.dto';
import { AddPartToOrderDto } from '../application/dto/add-part-to-order.dto';
import { ServiceOrderStatus } from '../domain/entities/service-orders.entity';

@ApiTags('service-orders')
@Controller('service-orders')
export class ServiceOrdersController {
    constructor(
        private readonly createServiceOrderUseCase: CreateServiceOrderUseCase,
        private readonly getServiceOrderUseCase: GetServiceOrderUseCase,
        private readonly updateServiceOrderUseCase: UpdateServiceOrderUseCase,
        private readonly deleteServiceOrderUseCase: DeleteServiceOrderUseCase,
        private readonly addServiceToOrderUseCase: AddServiceToOrderUseCase,
        private readonly removeServiceFromOrderUseCase: RemoveServiceFromOrderUseCase,
        private readonly addPartToOrderUseCase: AddPartToOrderUseCase,
        private readonly removePartFromOrderUseCase: RemovePartFromOrderUseCase,
        private readonly startDiagnosisUseCase: StartDiagnosisUseCase,
        private readonly finishDiagnosisUseCase: FinishDiagnosisUseCase,
        private readonly sendBudgetUseCase: SendBudgetUseCase,
        private readonly approveBudgetUseCase: ApproveBudgetUseCase,
        private readonly rejectBudgetUseCase: RejectBudgetUseCase,
        private readonly finishOrderUseCase: FinishOrderUseCase,
        private readonly deliverOrderUseCase: DeliverOrderUseCase,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Abrir nova ordem de serviço' })
    @ApiResponse({ status: 201, description: 'OS criada com status RECEIVED' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 404, description: 'Cliente ou veículo não encontrado' })
    create(@Body() dto: CreateServiceOrderDto) {
        return this.createServiceOrderUseCase.execute(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar ordens de serviço' })
    @ApiQuery({ name: 'status', required: false, enum: ServiceOrderStatus })
    @ApiResponse({ status: 200, description: 'Lista de OS, opcionalmente filtrada por status' })
    findAll(@Query('status') status?: ServiceOrderStatus) {
        return this.getServiceOrderUseCase.executeAll(status);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar OS por ID (inclui serviços, peças e totalPrice)' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 200, description: 'OS com itens e totalPrice' })
    @ApiResponse({ status: 404, description: 'OS não encontrada' })
    findOne(@Param('id') id: string) {
        return this.getServiceOrderUseCase.execute(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar descrição da OS' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 200, description: 'OS atualizada' })
    @ApiResponse({ status: 404, description: 'OS não encontrada' })
    update(@Param('id') id: string, @Body() dto: UpdateServiceOrderDto) {
        return this.updateServiceOrderUseCase.execute(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remover OS' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 204, description: 'OS removida' })
    @ApiResponse({ status: 404, description: 'OS não encontrada' })
    remove(@Param('id') id: string) {
        return this.deleteServiceOrderUseCase.execute(id);
    }

    @Post(':id/services')
    @ApiOperation({ summary: 'Adicionar serviço à OS' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 201, description: 'Serviço adicionado; totalPrice recalculado' })
    @ApiResponse({ status: 404, description: 'OS ou serviço não encontrado' })
    @ApiResponse({ status: 409, description: 'Serviço já adicionado à OS' })
    addService(@Param('id') id: string, @Body() dto: AddServiceToOrderDto) {
        return this.addServiceToOrderUseCase.execute(id, dto.serviceId);
    }

    @Delete(':id/services/:serviceId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remover serviço da OS' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiParam({ name: 'serviceId', description: 'UUID do serviço' })
    @ApiResponse({ status: 204, description: 'Serviço removido; totalPrice recalculado' })
    @ApiResponse({ status: 404, description: 'OS ou serviço não encontrado na OS' })
    removeService(@Param('id') id: string, @Param('serviceId') serviceId: string) {
        return this.removeServiceFromOrderUseCase.execute(id, serviceId);
    }

    @Post(':id/parts')
    @ApiOperation({ summary: 'Adicionar peça à OS' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 201, description: 'Peça adicionada; resposta inclui stockAvailable e stockQty' })
    @ApiResponse({ status: 400, description: 'Quantidade < 1' })
    @ApiResponse({ status: 404, description: 'OS ou peça não encontrada' })
    @ApiResponse({ status: 409, description: 'Peça já adicionada à OS' })
    addPart(@Param('id') id: string, @Body() dto: AddPartToOrderDto) {
        return this.addPartToOrderUseCase.execute(id, dto.partId, dto.quantity);
    }

    @Delete(':id/parts/:partId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remover peça da OS' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiParam({ name: 'partId', description: 'UUID da peça' })
    @ApiResponse({ status: 204, description: 'Peça removida; totalPrice recalculado' })
    @ApiResponse({ status: 404, description: 'OS ou peça não encontrada na OS' })
    removePart(@Param('id') id: string, @Param('partId') partId: string) {
        return this.removePartFromOrderUseCase.execute(id, partId);
    }

    @Post(':id/start-diagnosis')
    @ApiOperation({ summary: 'Iniciar diagnóstico (RECEIVED → DIAGNOSING)' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 201, description: 'Status atualizado para DIAGNOSING' })
    @ApiResponse({ status: 404, description: 'OS não encontrada' })
    @ApiResponse({ status: 422, description: 'Transição inválida: status atual não é RECEIVED' })
    startDiagnosis(@Param('id') id: string) {
        return this.startDiagnosisUseCase.execute(id);
    }

    @Post(':id/finish-diagnosis')
    @ApiOperation({ summary: 'Concluir diagnóstico (DIAGNOSING → WAITING_APPROVAL)' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 201, description: 'Status atualizado para WAITING_APPROVAL; totalPrice recalculado' })
    @ApiResponse({ status: 422, description: 'Transição inválida: status atual não é DIAGNOSING' })
    finishDiagnosis(@Param('id') id: string) {
        return this.finishDiagnosisUseCase.execute(id);
    }

    @Post(':id/send-budget')
    @ApiOperation({ summary: 'Validar e formalizar envio do orçamento' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 201, description: 'Orçamento válido; retorna OS com itens e totalPrice' })
    @ApiResponse({ status: 422, description: 'totalPrice == 0 ou status não é WAITING_APPROVAL' })
    sendBudget(@Param('id') id: string) {
        return this.sendBudgetUseCase.execute(id);
    }

    @Post(':id/approve-budget')
    @ApiOperation({ summary: 'Aprovar orçamento (WAITING_APPROVAL → IN_PROGRESS)' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 201, description: 'Orçamento aprovado; estoque reservado atomicamente' })
    @ApiResponse({ status: 422, description: 'Transição inválida ou estoque insuficiente' })
    approveBudget(@Param('id') id: string) {
        return this.approveBudgetUseCase.execute(id);
    }

    @Post(':id/reject-budget')
    @ApiOperation({ summary: 'Rejeitar orçamento (WAITING_APPROVAL → RECEIVED)' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 201, description: 'Orçamento rejeitado; status volta para RECEIVED' })
    @ApiResponse({ status: 422, description: 'Transição inválida: status atual não é WAITING_APPROVAL' })
    rejectBudget(@Param('id') id: string) {
        return this.rejectBudgetUseCase.execute(id);
    }

    @Post(':id/finish')
    @ApiOperation({ summary: 'Finalizar OS (IN_PROGRESS → FINISHED)' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 201, description: 'OS finalizada; baixa de estoque confirmada' })
    @ApiResponse({ status: 422, description: 'Transição inválida: status atual não é IN_PROGRESS' })
    finish(@Param('id') id: string) {
        return this.finishOrderUseCase.execute(id);
    }

    @Post(':id/deliver')
    @ApiOperation({ summary: 'Entregar veículo (FINISHED → DELIVERED)' })
    @ApiParam({ name: 'id', description: 'UUID da OS' })
    @ApiResponse({ status: 201, description: 'Veículo entregue; OS em estado final imutável' })
    @ApiResponse({ status: 422, description: 'Transição inválida: status atual não é FINISHED' })
    deliver(@Param('id') id: string) {
        return this.deliverOrderUseCase.execute(id);
    }
}
