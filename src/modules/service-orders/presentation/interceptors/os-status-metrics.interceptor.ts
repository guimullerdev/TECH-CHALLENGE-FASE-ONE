import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';

import { OrdemDeServico } from '../../domain/entities/service-orders.entity';

/**
 * Identificador estável do evento de transição de status.
 *
 * É o que o dashboard "tempo médio de execução por status" consulta. Sem
 * este evento, o dado existe só no Postgres — e o New Relic não consulta o
 * banco da aplicação, então o painel ficaria vazio.
 */
export const EVENTO_TRANSICAO_STATUS = 'os.status.transicao';

@Injectable()
export class OsStatusMetricsInterceptor implements NestInterceptor {
    constructor(private readonly logger: PinoLogger) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const request = context.switchToHttp().getRequest<Request>();

        return next.handle().pipe(
            tap((resposta) => {
                if (!(resposta instanceof OrdemDeServico)) return;

                const duracao = resposta.duracaoUltimoStatusSegundos;
                // undefined = OS recém-criada, ainda sem transição anterior
                // para medir. Não é erro, só não há intervalo.
                if (duracao === undefined) return;

                const historico = resposta.historicoStatus;
                const ultima = historico[historico.length - 1];

                this.logger.info(
                    {
                        event: EVENTO_TRANSICAO_STATUS,
                        correlationId: (request as Request & { id?: string }).id,
                        osId: resposta.id,
                        osNumero: resposta.numero,
                        statusAnterior: ultima.statusAnterior,
                        statusNovo: ultima.statusNovo,
                        duracaoSegundos: duracao,
                    },
                    'Transição de status da ordem de serviço',
                );
            }),
        );
    }
}
