import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

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
            this.logger.error(
                `Unhandled exception on ${request.method} ${request.url}`,
                exception instanceof Error ? exception.stack : String(exception),
            );
        }

        response.status(status).json({ statusCode: status, message, error });
    }

    private statusLabel(status: number): string {
        return HttpStatus[status]?.replace(/_/g, ' ') ?? 'Unknown';
    }
}
