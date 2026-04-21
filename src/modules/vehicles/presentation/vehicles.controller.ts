import { Controller, Post, Get, Put, Patch, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

import { CreateVeiculoUseCase } from '../application/use-cases/create-vehicle.usecase';
import { GetVeiculoUseCase } from '../application/use-cases/get-vehicle.usecase';
import { UpdateVeiculoUseCase } from '../application/use-cases/update-vehicle.usecase';
import { DeactivateVeiculoUseCase } from '../application/use-cases/delete-vehicle.usecase';
import { CreateVeiculoDto } from '../application/dto/create-vehicle.dto';
import { UpdateVeiculoDto } from '../application/dto/update-vehicle.dto';

@ApiTags('veiculos')
@ApiBearerAuth()
@Controller('veiculos')
export class VehiclesController {
    constructor(
        private readonly createVeiculoUseCase: CreateVeiculoUseCase,
        private readonly getVeiculoUseCase: GetVeiculoUseCase,
        private readonly updateVeiculoUseCase: UpdateVeiculoUseCase,
        private readonly deactivateVeiculoUseCase: DeactivateVeiculoUseCase,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Cadastrar veículo' })
    @ApiResponse({ status: 201, description: 'Veículo cadastrado' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
    @ApiResponse({ status: 409, description: 'Placa já cadastrada' })
    create(@Body() dto: CreateVeiculoDto) {
        return this.createVeiculoUseCase.execute(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar veículos com filtros opcionais' })
    @ApiQuery({ name: 'clienteId', required: false })
    @ApiQuery({ name: 'placa', required: false })
    @ApiQuery({ name: 'ativo', required: false, type: Boolean })
    @ApiResponse({ status: 200, description: 'Lista de veículos' })
    findAll(
        @Query('clienteId') clienteId?: string,
        @Query('placa') placa?: string,
        @Query('ativo') ativo?: string,
    ) {
        const ativoFilter = ativo !== undefined ? ativo === 'true' : undefined;
        return this.getVeiculoUseCase.executeAll({ clienteId, placa, ativo: ativoFilter });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar veículo por ID' })
    @ApiParam({ name: 'id', description: 'UUID do veículo' })
    @ApiResponse({ status: 200, description: 'Veículo encontrado' })
    @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
    findOne(@Param('id') id: string) {
        return this.getVeiculoUseCase.execute(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar veículo' })
    @ApiParam({ name: 'id', description: 'UUID do veículo' })
    @ApiResponse({ status: 200, description: 'Veículo atualizado' })
    @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
    update(@Param('id') id: string, @Body() dto: UpdateVeiculoDto) {
        return this.updateVeiculoUseCase.execute(id, dto);
    }

    @Patch(':id/desativar')
    @ApiOperation({ summary: 'Desativar veículo' })
    @ApiParam({ name: 'id', description: 'UUID do veículo' })
    @ApiResponse({ status: 200, description: 'Veículo desativado' })
    @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
    deactivate(@Param('id') id: string) {
        return this.deactivateVeiculoUseCase.execute(id);
    }
}
