import { Controller, Post, Get, Put, Patch, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/domain/enums/user-role.enum';

import { CreatePecaUseCase } from '../application/use-cases/create-parts.usecase';
import { GetPecaUseCase } from '../application/use-cases/get-parts.usecase';
import { UpdatePecaUseCase } from '../application/use-cases/update-parts.usecase';
import { DeactivatePecaUseCase } from '../application/use-cases/delete-parts.usecase';
import { ReactivatePecaUseCase } from '../application/use-cases/reactivate-parts.usecase';
import { CreatePecaDto } from '../application/dto/create-parts.dto';
import { UpdatePecaDto } from '../application/dto/update-parts.dto';

@ApiTags('pecas')
@ApiBearerAuth()
@Controller('pecas')
export class PartsController {
    constructor(
        private readonly createPecaUseCase: CreatePecaUseCase,
        private readonly getPecaUseCase: GetPecaUseCase,
        private readonly updatePecaUseCase: UpdatePecaUseCase,
        private readonly deactivatePecaUseCase: DeactivatePecaUseCase,
        private readonly reactivatePecaUseCase: ReactivatePecaUseCase,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Cadastrar peça' })
    @ApiResponse({ status: 201, description: 'Peça cadastrada' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 409, description: 'Código já cadastrado' })
    create(@Body() dto: CreatePecaDto) {
        return this.createPecaUseCase.execute(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar peças com filtros opcionais' })
    @ApiQuery({ name: 'ativo', required: false, type: Boolean })
    @ApiQuery({ name: 'disponivel', required: false, type: Boolean })
    @ApiResponse({ status: 200, description: 'Lista de peças' })
    findAll(
        @Query('ativo') ativo?: string,
        @Query('disponivel') disponivel?: string,
    ) {
        const ativoFilter = ativo !== undefined ? ativo === 'true' : undefined;
        const disponivelFilter = disponivel !== undefined ? disponivel === 'true' : undefined;
        return this.getPecaUseCase.executeAll({ ativo: ativoFilter, disponivel: disponivelFilter });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar peça por ID' })
    @ApiParam({ name: 'id', description: 'UUID da peça' })
    @ApiResponse({ status: 200, description: 'Peça encontrada' })
    @ApiResponse({ status: 404, description: 'Peça não encontrada' })
    findOne(@Param('id') id: string) {
        return this.getPecaUseCase.execute(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar peça' })
    @ApiParam({ name: 'id', description: 'UUID da peça' })
    @ApiResponse({ status: 200, description: 'Peça atualizada' })
    @ApiResponse({ status: 404, description: 'Peça não encontrada' })
    update(@Param('id') id: string, @Body() dto: UpdatePecaDto) {
        return this.updatePecaUseCase.execute(id, dto);
    }

    @Patch(':id/desativar')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Desativar peça (somente ADMIN)' })
    @ApiParam({ name: 'id', description: 'UUID da peça' })
    @ApiResponse({ status: 200, description: 'Peça desativada' })
    @ApiResponse({ status: 403, description: 'Acesso negado' })
    @ApiResponse({ status: 404, description: 'Peça não encontrada' })
    deactivate(@Param('id') id: string) {
        return this.deactivatePecaUseCase.execute(id);
    }

    @Patch(':id/reativar')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Reativar peça (somente ADMIN)' })
    @ApiParam({ name: 'id', description: 'UUID da peça' })
    @ApiResponse({ status: 200, description: 'Peça reativada' })
    @ApiResponse({ status: 403, description: 'Acesso negado' })
    @ApiResponse({ status: 404, description: 'Peça não encontrada' })
    reactivate(@Param('id') id: string) {
        return this.reactivatePecaUseCase.execute(id);
    }
}
