import { randomUUID } from 'node:crypto';

import { Module } from '@nestjs/common';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { LoggerModule } from 'nestjs-pino';

export const CORRELATION_ID_HEADER = 'x-request-id';

/**
 * Logs estruturados em JSON com correlation-id por requisição.
 *
 * O mesmo header `x-request-id` é usado pela Lambda de autenticação
 * (`oficina-auth-lambda`), então uma requisição que passa pelos dois
 * componentes pode ser reconstruída inteira no New Relic (ADR 0004).
 */
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ?? 'info',

        // Reaproveita o id de quem chamou; só gera um novo se a requisição
        // chegou sem ele (ex.: chamada direta, sem passar pelo API Gateway).
        genReqId: (req: IncomingMessage, res: ServerResponse) => {
          const existing = req.headers[CORRELATION_ID_HEADER];
          const id =
            (Array.isArray(existing) ? existing[0] : existing) ?? randomUUID();
          // Devolve no response para o cliente conseguir citar o id ao
          // reportar um problema.
          res.setHeader(CORRELATION_ID_HEADER, id);
          return id;
        },

        customProps: (req) => ({
          correlationId: (req as IncomingMessage & { id?: string }).id,
          service: 'oficina-api',
        }),

        // Authorization e cookie ficam de fora de propósito — o log não pode
        // virar um vazamento de token.
        redact: {
          paths: [
            'req.headers.authorization',
            'req.headers.cookie',
            'res.headers["set-cookie"]',
          ],
          remove: true,
        },

        // Ruído: health check é chamado de segundo em segundo pelo
        // kubelet/monitor e não diz nada sobre o comportamento da app.
        autoLogging: {
          ignore: (req: IncomingMessage) => req.url === '/health',
        },

        // pino-pretty só em desenvolvimento: em produção a saída precisa ser
        // JSON puro para o New Relic conseguir indexar campo a campo.
        transport:
          process.env.NODE_ENV === 'production'
            ? undefined
            : { target: 'pino-pretty', options: { singleLine: true } },
      },
    }),
  ],
  // Reexporta para o `PinoLogger` poder ser injetado fora deste módulo —
  // o filtro global de exceções depende dele para logar de forma estruturada.
  exports: [LoggerModule],
})
export class LoggingModule {}
