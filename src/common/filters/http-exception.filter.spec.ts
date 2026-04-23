import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

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
});
