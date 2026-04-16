import { Controller, Post, Get, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { CreateCustomerUseCase } from '../application/use-cases/create-customers.usecase';
import { GetCustomerUseCase } from '../application/use-cases/get-customers.usecase';
import { UpdateCustomerUseCase } from '../application/use-cases/update-customers.usecase';
import { DeleteCustomerUseCase } from '../application/use-cases/delete-customers.usecase';
import { CreateCustomerDto } from '../application/dto/create-customers.dto';
import { UpdateCustomerDto } from '../application/dto/update-customers.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
    constructor(
        private readonly createCustomerUseCase: CreateCustomerUseCase,
        private readonly getCustomerUseCase: GetCustomerUseCase,
        private readonly updateCustomerUseCase: UpdateCustomerUseCase,
        private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Criar cliente' })
    @ApiResponse({ status: 201, description: 'Cliente criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 409, description: 'Documento já cadastrado' })
    create(@Body() dto: CreateCustomerDto) {
        return this.createCustomerUseCase.execute(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos os clientes' })
    @ApiResponse({ status: 200, description: 'Lista de clientes' })
    findAll() {
        return this.getCustomerUseCase.executeAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar cliente por ID' })
    @ApiParam({ name: 'id', description: 'UUID do cliente' })
    @ApiResponse({ status: 200, description: 'Cliente encontrado' })
    @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
    findOne(@Param('id') id: string) {
        return this.getCustomerUseCase.execute(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar cliente' })
    @ApiParam({ name: 'id', description: 'UUID do cliente' })
    @ApiResponse({ status: 200, description: 'Cliente atualizado' })
    @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
    @ApiResponse({ status: 409, description: 'Documento já cadastrado para outro cliente' })
    update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
        return this.updateCustomerUseCase.execute(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remover cliente' })
    @ApiParam({ name: 'id', description: 'UUID do cliente' })
    @ApiResponse({ status: 204, description: 'Cliente removido' })
    @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
    remove(@Param('id') id: string) {
        return this.deleteCustomerUseCase.execute(id);
    }
}
