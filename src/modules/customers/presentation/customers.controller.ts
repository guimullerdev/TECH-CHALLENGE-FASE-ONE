import { Controller, Post, Get, Put, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

import { CreateClienteUseCase } from '../application/use-cases/create-customers.usecase';
import { GetClienteUseCase } from '../application/use-cases/get-customers.usecase';
import { UpdateClienteUseCase } from '../application/use-cases/update-customers.usecase';
import { DeactivateClienteUseCase } from '../application/use-cases/delete-customers.usecase';
import { CreateClienteDto } from '../application/dto/create-customers.dto';
import { UpdateClienteDto } from '../application/dto/update-customers.dto';

@ApiTags('clientes')
@ApiBearerAuth()
@Controller('clientes')
export class CustomersController {
    constructor(
        private readonly createClienteUseCase: CreateClienteUseCase,
        private readonly getClienteUseCase: GetClienteUseCase,
        private readonly updateClienteUseCase: UpdateClienteUseCase,
        private readonly deactivateClienteUseCase: DeactivateClienteUseCase,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Criar cliente' })
    @ApiResponse({ status: 201, description: 'Cliente criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 409, description: 'Documento já cadastrado' })
    create(@Body() dto: CreateClienteDto) {
        return this.createClienteUseCase.execute(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar clientes com filtros opcionais' })
    @ApiQuery({ name: 'nome', required: false })
    @ApiQuery({ name: 'documento', required: false, description: 'CPF (11 dígitos) ou CNPJ (14 dígitos)' })
    @ApiQuery({ name: 'ativo', required: false, type: Boolean })
    @ApiResponse({ status: 200, description: 'Lista de clientes' })
    findAll(
        @Query('nome') nome?: string,
        @Query('documento') documento?: string,
        @Query('ativo') ativo?: string,
    ) {
        const ativoFilter = ativo !== undefined ? ativo === 'true' : undefined;
        return this.getClienteUseCase.executeAll({ nome, documento, ativo: ativoFilter });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar cliente por ID' })
    @ApiParam({ name: 'id', description: 'UUID do cliente' })
    @ApiResponse({ status: 200, description: 'Cliente encontrado' })
    @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
    findOne(@Param('id') id: string) {
        return this.getClienteUseCase.execute(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar cliente' })
    @ApiParam({ name: 'id', description: 'UUID do cliente' })
    @ApiResponse({ status: 200, description: 'Cliente atualizado' })
    @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
    update(@Param('id') id: string, @Body() dto: UpdateClienteDto) {
        return this.updateClienteUseCase.execute(id, dto);
    }

    @Patch(':id/desativar')
    @ApiOperation({ summary: 'Desativar cliente' })
    @ApiParam({ name: 'id', description: 'UUID do cliente' })
    @ApiResponse({ status: 200, description: 'Cliente desativado' })
    @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
    deactivate(@Param('id') id: string) {
        return this.deactivateClienteUseCase.execute(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Remover cliente (soft delete)' })
    @ApiParam({ name: 'id', description: 'UUID do cliente' })
    @ApiResponse({ status: 200, description: 'Cliente removido' })
    @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
    remove(@Param('id') id: string) {
        return this.deactivateClienteUseCase.execute(id);
    }
}
