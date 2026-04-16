import { Controller, Post, Get, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { CreatePartUseCase } from '../application/use-cases/create-parts.usecase';
import { GetPartUseCase } from '../application/use-cases/get-parts.usecase';
import { UpdatePartUseCase } from '../application/use-cases/update-parts.usecase';
import { DeletePartUseCase } from '../application/use-cases/delete-parts.usecase';
import { CreatePartDto } from '../application/dto/create-parts.dto';
import { UpdatePartDto } from '../application/dto/update-parts.dto';

@ApiTags('parts')
@Controller('parts')
export class PartsController {
    constructor(
        private readonly createPartUseCase: CreatePartUseCase,
        private readonly getPartUseCase: GetPartUseCase,
        private readonly updatePartUseCase: UpdatePartUseCase,
        private readonly deletePartUseCase: DeletePartUseCase,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Cadastrar peça' })
    @ApiResponse({ status: 201, description: 'Peça cadastrada' })
    @ApiResponse({ status: 400, description: 'Dados inválidos (preço ou estoque negativos)' })
    create(@Body() dto: CreatePartDto) {
        return this.createPartUseCase.execute(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas as peças em estoque' })
    @ApiResponse({ status: 200, description: 'Lista de peças' })
    findAll() {
        return this.getPartUseCase.executeAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar peça por ID' })
    @ApiParam({ name: 'id', description: 'UUID da peça' })
    @ApiResponse({ status: 200, description: 'Peça encontrada' })
    @ApiResponse({ status: 404, description: 'Peça não encontrada' })
    findOne(@Param('id') id: string) {
        return this.getPartUseCase.execute(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar peça' })
    @ApiParam({ name: 'id', description: 'UUID da peça' })
    @ApiResponse({ status: 200, description: 'Peça atualizada' })
    @ApiResponse({ status: 400, description: 'Estoque ou preço negativo' })
    @ApiResponse({ status: 404, description: 'Peça não encontrada' })
    update(@Param('id') id: string, @Body() dto: UpdatePartDto) {
        return this.updatePartUseCase.execute(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remover peça' })
    @ApiParam({ name: 'id', description: 'UUID da peça' })
    @ApiResponse({ status: 204, description: 'Peça removida' })
    @ApiResponse({ status: 404, description: 'Peça não encontrada' })
    remove(@Param('id') id: string) {
        return this.deletePartUseCase.execute(id);
    }
}
