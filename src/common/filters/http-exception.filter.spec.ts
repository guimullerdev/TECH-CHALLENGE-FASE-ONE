import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
    FALHA_PROCESSAMENTO_OS,
    FALHA_REQUISICAO,
    HttpExceptionFilter,
} from './http-exception.filter';

const makeHost = (responseMock: any, requestMock: any = { method: 'GET', url: '/test' }) => ({
    switchToHttp: () => ({
        getResponse: () => responseMock,
        getRequest: () => requestMock,
    }),
});

const makeResponse = () => {
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    return { status, json, _json: json };
};

describe('HttpExceptionFilter', () => {
    let filter: HttpExceptionFilter;

    beforeEach(() => {
        filter = new HttpExceptionFilter();
        jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});
    });

    it('handles HttpException with string response body', () => {
        const res = makeResponse();
        const host = makeHost(res) as any;
        const exception = new HttpException('Bad request message', HttpStatus.BAD_REQUEST);

        filter.catch(exception, host);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res._json).toHaveBeenCalledWith(
            expect.objectContaining({ statusCode: 400, message: 'Bad request message' }),
        );
    });

    it('handles HttpException with object response body', () => {
        const res = makeResponse();
        const host = makeHost(res) as any;
        const exception = new HttpException(
            { message: ['field is required'], error: 'Bad Request' },
            HttpStatus.BAD_REQUEST,
        );

        filter.catch(exception, host);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res._json).toHaveBeenCalledWith(
            expect.objectContaining({ statusCode: 400, message: ['field is required'], error: 'Bad Request' }),
        );
    });

    it('handles HttpException with object body missing error field', () => {
        const res = makeResponse();
        const host = makeHost(res) as any;
        const exception = new HttpException({ message: 'Not found' }, HttpStatus.NOT_FOUND);

        filter.catch(exception, host);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res._json).toHaveBeenCalledWith(
            expect.objectContaining({ statusCode: 404, message: 'Not found' }),
        );
    });

    it('handles 401 Unauthorized', () => {
        const res = makeResponse();
        const host = makeHost(res) as any;
        const exception = new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

        filter.catch(exception, host);

        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('handles 403 Forbidden', () => {
        const res = makeResponse();
        const host = makeHost(res) as any;
        const exception = new HttpException('Forbidden', HttpStatus.FORBIDDEN);

        filter.catch(exception, host);

        expect(res.status).toHaveBeenCalledWith(403);
    });

    it('handles non-HttpException as 500 Internal Server Error', () => {
        const res = makeResponse();
        const req = { method: 'POST', url: '/crash' };
        const host = makeHost(res, req) as any;
        const exception = new Error('Something exploded');

        filter.catch(exception, host);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res._json).toHaveBeenCalledWith(
            expect.objectContaining({ statusCode: 500, message: 'Internal server error' }),
        );
    });

    it('handles non-Error unknown exception as 500', () => {
        const res = makeResponse();
        const req = { method: 'GET', url: '/crash' };
        const host = makeHost(res, req) as any;

        filter.catch('some string error', host);

        expect(res.status).toHaveBeenCalledWith(500);
    });

    it('uses exception.message when object body has no message field', () => {
        const res = makeResponse();
        const host = makeHost(res) as any;
        const exception = new HttpException({ error: 'Custom Error' }, HttpStatus.BAD_REQUEST);

        filter.catch(exception, host);

        const body = (res._json.mock.calls[0][0] as any);
        expect(body.message).toBeDefined();
        expect(body.error).toBe('Custom Error');
    });

    it('returns Unknown for unrecognized status code', () => {
        const res = makeResponse();
        const host = makeHost(res) as any;
        const exception = new HttpException('Custom status', 999 as any);

        filter.catch(exception, host);

        expect(res.status).toHaveBeenCalledWith(999);
        const body = res._json.mock.calls[0][0] as any;
        expect(body.error).toBe('Unknown');
    });

    // Estes campos são o que os alertas do New Relic consultam. Se alguém
    // renomear `event` ou parar de logar, o alerta continua existindo e
    // simplesmente nunca mais dispara — falha silenciosa. Daí os testes.
    describe('log estruturado de falha (base dos alertas)', () => {
        const makeLogger = () => ({ error: jest.fn() });

        it('marca falha em rota de OS com o evento específico', () => {
            const logger = makeLogger();
            const filtroComLogger = new HttpExceptionFilter(logger as any);
            const res = makeResponse();
            const host = makeHost(res, {
                method: 'POST',
                url: '/os/123/servicos',
                id: 'corr-abc',
            }) as any;

            filtroComLogger.catch(new Error('banco caiu'), host);

            expect(logger.error).toHaveBeenCalledWith(
                expect.objectContaining({
                    event: FALHA_PROCESSAMENTO_OS,
                    correlationId: 'corr-abc',
                    statusCode: 500,
                    url: '/os/123/servicos',
                }),
                expect.any(String),
            );
        });

        it('usa o evento genérico fora das rotas de OS', () => {
            const logger = makeLogger();
            const filtroComLogger = new HttpExceptionFilter(logger as any);
            const host = makeHost(makeResponse(), { method: 'GET', url: '/clientes' }) as any;

            filtroComLogger.catch(new Error('falhou'), host);

            expect(logger.error).toHaveBeenCalledWith(
                expect.objectContaining({ event: FALHA_REQUISICAO }),
                expect.any(String),
            );
        });

        it('não gera log de erro para 4xx — é o cliente errando, não o sistema', () => {
            const logger = makeLogger();
            const filtroComLogger = new HttpExceptionFilter(logger as any);
            const host = makeHost(makeResponse(), { method: 'GET', url: '/os/123' }) as any;

            filtroComLogger.catch(
                new HttpException('CPF inválido', HttpStatus.BAD_REQUEST),
                host,
            );

            expect(logger.error).not.toHaveBeenCalled();
        });

        it('inclui a stack da exceção para o alerta ser investigável', () => {
            const logger = makeLogger();
            const filtroComLogger = new HttpExceptionFilter(logger as any);
            const host = makeHost(makeResponse(), { method: 'POST', url: '/os' }) as any;

            filtroComLogger.catch(new Error('timeout no banco'), host);

            const campos = logger.error.mock.calls[0][0] as any;
            expect(campos.exception.message).toBe('timeout no banco');
            expect(campos.exception.stack).toEqual(expect.any(String));
        });
    });
});
