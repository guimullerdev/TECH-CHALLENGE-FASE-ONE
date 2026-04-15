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
    create(@Body() dto: CreateServiceOrderDto) {
        return this.createServiceOrderUseCase.execute(dto);
    }

    @Get()
    findAll(@Query('status') status?: ServiceOrderStatus) {
        return this.getServiceOrderUseCase.executeAll(status);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.getServiceOrderUseCase.execute(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateServiceOrderDto) {
        return this.updateServiceOrderUseCase.execute(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.deleteServiceOrderUseCase.execute(id);
    }

    // — Services —

    @Post(':id/services')
    addService(@Param('id') id: string, @Body() dto: AddServiceToOrderDto) {
        return this.addServiceToOrderUseCase.execute(id, dto.serviceId);
    }

    @Delete(':id/services/:serviceId')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeService(@Param('id') id: string, @Param('serviceId') serviceId: string) {
        return this.removeServiceFromOrderUseCase.execute(id, serviceId);
    }

    // — Parts —

    @Post(':id/parts')
    addPart(@Param('id') id: string, @Body() dto: AddPartToOrderDto) {
        return this.addPartToOrderUseCase.execute(id, dto.partId, dto.quantity);
    }

    @Delete(':id/parts/:partId')
    @HttpCode(HttpStatus.NO_CONTENT)
    removePart(@Param('id') id: string, @Param('partId') partId: string) {
        return this.removePartFromOrderUseCase.execute(id, partId);
    }

    // ── State machine ────────────────────────────────────────────────────────

    @Post(':id/start-diagnosis')
    startDiagnosis(@Param('id') id: string) {
        return this.startDiagnosisUseCase.execute(id);
    }

    @Post(':id/finish-diagnosis')
    finishDiagnosis(@Param('id') id: string) {
        return this.finishDiagnosisUseCase.execute(id);
    }

    @Post(':id/send-budget')
    sendBudget(@Param('id') id: string) {
        return this.sendBudgetUseCase.execute(id);
    }

    @Post(':id/approve-budget')
    approveBudget(@Param('id') id: string) {
        return this.approveBudgetUseCase.execute(id);
    }

    @Post(':id/reject-budget')
    rejectBudget(@Param('id') id: string) {
        return this.rejectBudgetUseCase.execute(id);
    }

    @Post(':id/finish')
    finish(@Param('id') id: string) {
        return this.finishOrderUseCase.execute(id);
    }

    @Post(':id/deliver')
    deliver(@Param('id') id: string) {
        return this.deliverOrderUseCase.execute(id);
    }
}
