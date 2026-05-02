import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TempoMedioServicosUseCase } from '../application/use-cases/tempo-medio-servicos.usecase';
import { TempoMedioServicoDto } from '../application/dto/tempo-medio-servico-response.dto';

@ApiTags('relatorios')
@ApiBearerAuth()
@Controller('relatorios')
export class RelatoriosController {
    constructor(private readonly tempoMedioUseCase: TempoMedioServicosUseCase) {}

    @Get('tempo-medio-servicos')
    @ApiOperation({ summary: 'Tempo médio de execução por tipo de serviço' })
    @ApiResponse({ status: 200, type: [TempoMedioServicoDto] })
    getTempoMedioServicos(): Promise<TempoMedioServicoDto[]> {
        return this.tempoMedioUseCase.execute();
    }

}
