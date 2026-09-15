import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { OrdemDeServico } from '../domain/entities/service-orders.entity';

/**
 * Identificador estável do evento de transição de status.
 *
 * É o que o dashboard "tempo médio por status" consulta. Sem este evento o
 * dado existe só no Postgres — e o New Relic não consulta o banco da
 * aplicação, então o painel ficaria vazio.
 */
export const EVENTO_TRANSICAO_STATUS = 'os.status.transicao';

/**
 * Emite a métrica de transição de status da OS.
 *
 * Existe como serviço, e não só dentro do interceptor, porque nem toda
 * transição passa pelo controller de ordens de serviço: aprovar ou reprovar
 * um orçamento move a OS a partir do controller de **orçamentos**, e o
 * interceptor não alcança esse caminho.
 *
 * Enquanto a emissão viveu só no interceptor, o tempo que uma OS passava em
 * `AGUARDANDO_APROVACAO` nunca chegava ao dashboard — justamente o intervalo
 * em que o cliente está decidendo, que é o de maior significado de negócio.
 */
@Injectable()
export class OsStatusMetrics {
    constructor(private readonly logger: PinoLogger) {}

    registrarTransicao(os: OrdemDeServico, correlationId?: string): void {
        const duracao = os.duracaoUltimoStatusSegundos;
        // undefined = OS recém-criada, ainda sem transição anterior para
        // medir. Não é erro, só não há intervalo.
        if (duracao === undefined) return;

        const historico = os.historicoStatus;
        const ultima = historico[historico.length - 1];

        this.logger.info(
            {
                event: EVENTO_TRANSICAO_STATUS,
                correlationId,
                osId: os.id,
                osNumero: os.numero,
                statusAnterior: ultima.statusAnterior,
                statusNovo: ultima.statusNovo,
                duracaoSegundos: duracao,
            },
            'Transição de status da ordem de serviço',
        );
    }
}
