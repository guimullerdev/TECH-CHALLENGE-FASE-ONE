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
}
