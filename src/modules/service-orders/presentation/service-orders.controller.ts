import { Controller, Post, Body } from '@nestjs/common';

import { CreateServiceOrderUseCase } from '../application/use-cases/create-service-orders.usecase';
import { CreateServiceOrderDto } from '../application/dto/create-service-orders.dto';

@Controller('service-orders')
export class ServiceOrdersController {
    constructor(private readonly createServiceOrderUseCase: CreateServiceOrderUseCase) { }

    @Post()
    create(@Body() createServiceOrderDto: CreateServiceOrderDto) {
        return this.createServiceOrderUseCase.execute(createServiceOrderDto);
    }
}
