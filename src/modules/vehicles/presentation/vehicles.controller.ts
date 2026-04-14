import { Controller, Post, Get, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';

import { CreateVehicleUseCase } from '../application/use-cases/create-vehicle.usecase';
import { GetVehicleUseCase } from '../application/use-cases/get-vehicle.usecase';
import { UpdateVehicleUseCase } from '../application/use-cases/update-vehicle.usecase';
import { DeleteVehicleUseCase } from '../application/use-cases/delete-vehicle.usecase';
import { CreateVehicleDto } from '../application/dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../application/dto/update-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
    constructor(
        private readonly createVehicleUseCase: CreateVehicleUseCase,
        private readonly getVehicleUseCase: GetVehicleUseCase,
        private readonly updateVehicleUseCase: UpdateVehicleUseCase,
        private readonly deleteVehicleUseCase: DeleteVehicleUseCase,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateVehicleDto) {
        return this.createVehicleUseCase.execute(dto);
    }

    @Get()
    findAll() {
        return this.getVehicleUseCase.executeAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.getVehicleUseCase.execute(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
        return this.updateVehicleUseCase.execute(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.deleteVehicleUseCase.execute(id);
    }
}
