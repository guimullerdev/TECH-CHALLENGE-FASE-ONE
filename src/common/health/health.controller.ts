import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Public } from '../../modules/auth/decorators/public.decorator';

@ApiTags('health')
@Controller('health')
export class HealthController {
    @Get()
    @Public()
    @ApiOperation({ summary: 'Verifica se a aplicação está no ar (liveness/readiness probe)' })
    @ApiResponse({ status: 200, description: 'Aplicação saudável' })
    check() {
        return {
            // `status` continua sendo o primeiro campo: o monitor de uptime
            // do New Relic valida o corpo procurando por `"status":"ok"`, e a
            // checagem quebraria se a chave mudasse de nome ou sumisse.
            status: 'ok',
            // Quem responde. Sem isso, olhar o /health de homolog e o de
            // produção dá exatamente a mesma resposta — e não há como saber,
            // de fora, se o deploy foi para o ambiente certo.
            ambiente: process.env.APP_AMBIENTE ?? 'local',
            // Qual build está no ar. O pipeline injeta o SHA do commit, então
            // dá para confirmar que o rollout entregou a versão esperada sem
            // precisar entrar no cluster.
            versao: process.env.APP_VERSION ?? 'dev',
        };
    }
}
