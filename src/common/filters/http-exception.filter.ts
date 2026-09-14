import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

/**
 * Identificadores estáveis de evento de falha.
 *
 * São o que os alertas do New Relic consultam. Ficam separados da mensagem
 * porque mensagem muda com refatoração e quebraria o alerta em silêncio —
 * o alerta continuaria existindo, só nunca mais dispararia.
 */
export const FALHA_REQUISICAO = 'requisicao.falha';
export const FALHA_PROCESSAMENTO_OS = 'os.processamento.falha';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger?: PinoLogger) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        let message: string | string[];
        let error: string;

        if (exception instanceof HttpException) {
            const raw = exception.getResponse();
            if (typeof raw === 'string') {
                message = raw;
                error = this.statusLabel(status);
            } else {
                const body = raw as Record<string, unknown>;
                message = (body.message as string | string[]) ?? exception.message;
                error = (body.error as string) ?? this.statusLabel(status);
            }
        } else {
            message = 'Internal server error';
            error = 'Internal Server Error';
        }

        // Só 5xx vira log de erro: 4xx é o cliente errando (CPF inválido,
        // validação), não falha do sistema — alertar nisso geraria ruído
        // constante e o alerta acabaria sendo ignorado.
        if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logarFalha(request, status, exception);
        }

        response.status(status).json({ statusCode: status, message, error });
    }

    private logarFalha(request: Request, status: number, exception: unknown): void {
        const ehRotaDeOs = request.url?.startsWith('/os');

        const campos = {
            // Rotas de OS ganham evento próprio para o alerta de "falhas no
            // processamento de ordens de serviço" poder ser específico, em
            // vez de disparar com qualquer erro da aplicação.
            event: ehRotaDeOs ? FALHA_PROCESSAMENTO_OS : FALHA_REQUISICAO,
            correlationId: (request as Request & { id?: string }).id,
            method: request.method,
            url: request.url,
            statusCode: status,
            exception:
                exception instanceof Error
                    ? { name: exception.name, message: exception.message, stack: exception.stack }
                    : { message: String(exception) },
        };

        const mensagem = ehRotaDeOs
            ? 'Falha no processamento de ordem de serviço'
            : 'Falha no processamento da requisição';

        if (this.logger) {
            this.logger.error(campos, mensagem);
        } else {
            // Sem logger injetado (ex.: instanciado à mão em teste), ainda
            // assim emite JSON — o alerta não pode depender de DI.
            console.error(JSON.stringify({ level: 'error', msg: mensagem, ...campos }));
        }
    }

    private statusLabel(status: number): string {
        return HttpStatus[status]?.replace(/_/g, ' ') ?? 'Unknown';
    }
}
