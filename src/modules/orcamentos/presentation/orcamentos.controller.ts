import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

import { GetOrcamentoUseCase } from '../application/use-cases/get-orcamento.usecase';
import { EnviarOrcamentoUseCase } from '../application/use-cases/enviar-orcamento.usecase';
import { AprovarOrcamentoUseCase } from '../application/use-cases/aprovar-orcamento.usecase';
import { ReprovarOrcamentoUseCase } from '../application/use-cases/reprovar-orcamento.usecase';
import { ReprovarOrcamentoDto } from '../application/dto/reprovar-orcamento.dto';

@ApiTags('orcamentos')
@ApiBearerAuth()
@Controller('orcamentos')
export class OrcamentosController {
    constructor(
        private readonly getOrcamentoUseCase: GetOrcamentoUseCase,
        private readonly enviarOrcamentoUseCase: EnviarOrcamentoUseCase,
        private readonly aprovarOrcamentoUseCase: AprovarOrcamentoUseCase,
        private readonly reprovarOrcamentoUseCase: ReprovarOrcamentoUseCase,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Buscar orçamento por ID' })
    @ApiParam({ name: 'id', description: 'UUID do orçamento' })
    @ApiResponse({ status: 200, description: 'Orçamento encontrado' })
    @ApiResponse({ status: 404, description: 'Orçamento não encontrado' })
    findOne(@Param('id') id: string) {
        return this.getOrcamentoUseCase.execute(id);
    }

    @Post(':id/enviar')
    @ApiOperation({ summary: 'Enviar orçamento ao cliente' })
    @ApiParam({ name: 'id', description: 'UUID do orçamento' })
    @ApiResponse({ status: 201, description: 'Orçamento enviado' })
    @ApiResponse({ status: 404, description: 'Orçamento não encontrado' })
    @ApiResponse({ status: 422, description: 'Transição inválida' })
    enviar(@Param('id') id: string) {
        return this.enviarOrcamentoUseCase.execute(id);
    }

    @Patch(':id/aprovar')
    @ApiOperation({ summary: 'Aprovar orçamento' })
    @ApiParam({ name: 'id', description: 'UUID do orçamento' })
    @ApiResponse({ status: 200, description: 'Orçamento aprovado; OS atualizada para APROVADA' })
    @ApiResponse({ status: 404, description: 'Orçamento não encontrado' })
    @ApiResponse({ status: 422, description: 'Transição inválida' })
    aprovar(@Param('id') id: string) {
        return this.aprovarOrcamentoUseCase.execute(id);
    }

    @Patch(':id/reprovar')
    @ApiOperation({ summary: 'Reprovar orçamento' })
    @ApiParam({ name: 'id', description: 'UUID do orçamento' })
    @ApiResponse({ status: 200, description: 'Orçamento reprovado; OS atualizada para REPROVADA' })
    @ApiResponse({ status: 404, description: 'Orçamento não encontrado' })
    @ApiResponse({ status: 422, description: 'Transição inválida' })
    reprovar(@Param('id') id: string, @Body() dto: ReprovarOrcamentoDto) {
        return this.reprovarOrcamentoUseCase.execute(id, dto.observacoes);
    }
}
