import { Controller, Post, Get, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { CreateVehicleUseCase } from '../application/use-cases/create-vehicle.usecase';
import { GetVehicleUseCase } from '../application/use-cases/get-vehicle.usecase';
import { UpdateVehicleUseCase } from '../application/use-cases/update-vehicle.usecase';
import { DeleteVehicleUseCase } from '../application/use-cases/delete-vehicle.usecase';
import { CreateVehicleDto } from '../application/dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../application/dto/update-vehicle.dto';

@ApiTags('vehicles')
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
    @ApiOperation({ summary: 'Cadastrar veículo' })
    @ApiResponse({ status: 201, description: 'Veículo cadastrado' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
    @ApiResponse({ status: 409, description: 'Placa já cadastrada' })
    create(@Body() dto: CreateVehicleDto) {
        return this.createVehicleUseCase.execute(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos os veículos' })
    @ApiResponse({ status: 200, description: 'Lista de veículos' })
    findAll() {
        return this.getVehicleUseCase.executeAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar veículo por ID' })
    @ApiParam({ name: 'id', description: 'UUID do veículo' })
    @ApiResponse({ status: 200, description: 'Veículo encontrado' })
    @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
    findOne(@Param('id') id: string) {
        return this.getVehicleUseCase.execute(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar veículo' })
    @ApiParam({ name: 'id', description: 'UUID do veículo' })
    @ApiResponse({ status: 200, description: 'Veículo atualizado' })
    @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
    update(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
        return this.updateVehicleUseCase.execute(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remover veículo' })
    @ApiParam({ name: 'id', description: 'UUID do veículo' })
    @ApiResponse({ status: 204, description: 'Veículo removido' })
    @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
    remove(@Param('id') id: string) {
        return this.deleteVehicleUseCase.execute(id);
    }
}
