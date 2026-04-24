import { Controller, Post, Get, Put, Patch, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/domain/enums/user-role.enum';

import { CreateServicoUseCase } from '../application/use-cases/create-services.use-case';
import { GetServicoUseCase } from '../application/use-cases/get-services.use-case';
import { UpdateServicoUseCase } from '../application/use-cases/update-services.use-case';
import { DeactivateServicoUseCase } from '../application/use-cases/delete-services.use-case';
import { ReactivateServicoUseCase } from '../application/use-cases/reactivate-services.use-case';
import { CreateServicoDto } from '../application/dto/create-services.dto';
import { UpdateServicoDto } from '../application/dto/update-services.dto';

@ApiTags('servicos')
@ApiBearerAuth()
@Controller('servicos')
export class ServicesController {
    constructor(
        private readonly createServicoUseCase: CreateServicoUseCase,
        private readonly getServicoUseCase: GetServicoUseCase,
        private readonly updateServicoUseCase: UpdateServicoUseCase,
        private readonly deactivateServicoUseCase: DeactivateServicoUseCase,
        private readonly reactivateServicoUseCase: ReactivateServicoUseCase,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Cadastrar serviço' })
    @ApiResponse({ status: 201, description: 'Serviço cadastrado' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    create(@Body() dto: CreateServicoDto) {
        return this.createServicoUseCase.execute(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar serviços com filtros opcionais' })
    @ApiQuery({ name: 'ativo', required: false, type: Boolean })
    @ApiResponse({ status: 200, description: 'Catálogo de serviços' })
    findAll(@Query('ativo') ativo?: string) {
        const ativoFilter = ativo !== undefined ? ativo === 'true' : undefined;
        return this.getServicoUseCase.executeAll({ ativo: ativoFilter });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar serviço por ID' })
    @ApiParam({ name: 'id', description: 'UUID do serviço' })
    @ApiResponse({ status: 200, description: 'Serviço encontrado' })
    @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
    findOne(@Param('id') id: string) {
        return this.getServicoUseCase.execute(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar serviço' })
    @ApiParam({ name: 'id', description: 'UUID do serviço' })
    @ApiResponse({ status: 200, description: 'Serviço atualizado' })
    @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
    update(@Param('id') id: string, @Body() dto: UpdateServicoDto) {
        return this.updateServicoUseCase.execute(id, dto);
    }

    @Patch(':id/desativar')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Desativar serviço (somente ADMIN)' })
    @ApiParam({ name: 'id', description: 'UUID do serviço' })
    @ApiResponse({ status: 200, description: 'Serviço desativado' })
    @ApiResponse({ status: 403, description: 'Acesso negado' })
    @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
    deactivate(@Param('id') id: string) {
        return this.deactivateServicoUseCase.execute(id);
    }

    @Patch(':id/reativar')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Reativar serviço (somente ADMIN)' })
    @ApiParam({ name: 'id', description: 'UUID do serviço' })
    @ApiResponse({ status: 200, description: 'Serviço reativado' })
    @ApiResponse({ status: 403, description: 'Acesso negado' })
    @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
    reactivate(@Param('id') id: string) {
        return this.reactivateServicoUseCase.execute(id);
    }
}
