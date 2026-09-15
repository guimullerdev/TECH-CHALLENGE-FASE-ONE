import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

import { OrdemDeServico } from '../../domain/entities/service-orders.entity';
import { OsStatusMetrics } from '../../application/os-status-metrics.service';

// Reexportado para não quebrar quem já importava daqui. A definição mora
// junto de quem emite o evento.
export { EVENTO_TRANSICAO_STATUS } from '../../application/os-status-metrics.service';

/**
 * Emite a métrica para as transições que passam pelo controller de ordens de
 * serviço, que são a maioria.
 *
 * Transição de orçamento (aprovar/reprovar) **não** passa por aqui: acontece
 * em outro controller e devolve um `Orcamento`, não uma `OrdemDeServico`.
 * Esse caminho emite a partir do próprio use case, usando o mesmo
 * `OsStatusMetrics`.
 */
@Injectable()
export class OsStatusMetricsInterceptor implements NestInterceptor {
    constructor(private readonly metrics: OsStatusMetrics) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const request = context.switchToHttp().getRequest<Request>();

        return next.handle().pipe(
            tap((resposta) => {
                if (!(resposta instanceof OrdemDeServico)) return;

                this.metrics.registrarTransicao(
                    resposta,
                    (request as Request & { id?: string }).id,
                );
            }),
        );
    }
}
