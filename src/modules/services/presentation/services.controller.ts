import { Controller, Post, Get, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';

import { CreateServicesUseCase } from '../application/use-cases/create-services.use-case';
import { GetServicesUseCase } from '../application/use-cases/get-services.use-case';
import { UpdateServicesUseCase } from '../application/use-cases/update-services.use-case';
import { DeleteServicesUseCase } from '../application/use-cases/delete-services.use-case';
import { CreateServicesDto } from '../application/dto/create-services.dto';
import { UpdateServicesDto } from '../application/dto/update-services.dto';

@Controller('services')
export class ServicesController {
    constructor(
        private readonly createServicesUseCase: CreateServicesUseCase,
        private readonly getServicesUseCase: GetServicesUseCase,
        private readonly updateServicesUseCase: UpdateServicesUseCase,
        private readonly deleteServicesUseCase: DeleteServicesUseCase,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateServicesDto) {
        return this.createServicesUseCase.execute(dto);
    }

    @Get()
    findAll() {
        return this.getServicesUseCase.executeAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.getServicesUseCase.execute(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateServicesDto) {
        return this.updateServicesUseCase.execute(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.deleteServicesUseCase.execute(id);
    }
}
