import { Controller, Post, Get, Patch, Delete, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

import { CreateServicesUseCase } from '../application/use-cases/create-services.use-case';
import { GetServicesUseCase } from '../application/use-cases/get-services.use-case';
import { UpdateServicesUseCase } from '../application/use-cases/update-services.use-case';
import { DeleteServicesUseCase } from '../application/use-cases/delete-services.use-case';
import { CreateServicesDto } from '../application/dto/create-services.dto';
import { UpdateServicesDto } from '../application/dto/update-services.dto';

@ApiTags('services')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
    @ApiOperation({ summary: 'Cadastrar serviço' })
    @ApiResponse({ status: 201, description: 'Serviço cadastrado' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    create(@Body() dto: CreateServicesDto) {
        return this.createServicesUseCase.execute(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos os serviços' })
    @ApiResponse({ status: 200, description: 'Catálogo de serviços' })
    findAll() {
        return this.getServicesUseCase.executeAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar serviço por ID' })
    @ApiParam({ name: 'id', description: 'UUID do serviço' })
    @ApiResponse({ status: 200, description: 'Serviço encontrado' })
    @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
    findOne(@Param('id') id: string) {
        return this.getServicesUseCase.execute(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar serviço' })
    @ApiParam({ name: 'id', description: 'UUID do serviço' })
    @ApiResponse({ status: 200, description: 'Serviço atualizado' })
    @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
    update(@Param('id') id: string, @Body() dto: UpdateServicesDto) {
        return this.updateServicesUseCase.execute(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remover serviço' })
    @ApiParam({ name: 'id', description: 'UUID do serviço' })
    @ApiResponse({ status: 204, description: 'Serviço removido' })
    @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
    remove(@Param('id') id: string) {
        return this.deleteServicesUseCase.execute(id);
    }
}
