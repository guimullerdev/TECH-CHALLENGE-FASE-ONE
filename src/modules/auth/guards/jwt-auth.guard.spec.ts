import { UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

const makeContext = (authHeader?: string, isPublic = false) => ({
    getHandler: jest.fn(),
    getClass: jest.fn(),
    switchToHttp: () => ({
        getRequest: () => ({
            headers: { authorization: authHeader },
            user: undefined,
        }),
    }),
});

const mockReflector = (isPublic: boolean) => ({
    getAllAndOverride: jest.fn().mockReturnValue(isPublic),
});

const mockJwt = (payload?: object, shouldThrow = false) => ({
    verifyAsync: shouldThrow
        ? jest.fn().mockRejectedValue(new Error('expired'))
        : jest.fn().mockResolvedValue(payload ?? { sub: 'u-1', email: 'a@b.com' }),
});

const mockConfig = () => ({
    get: jest.fn(),
});

describe('JwtAuthGuard', () => {
    it('returns true for public routes without checking token', async () => {
        const reflector = mockReflector(true);
        const jwt = mockJwt();
        const guard = new JwtAuthGuard(jwt as any, reflector as any, mockConfig() as any);

        const result = await guard.canActivate(makeContext(undefined, true) as any);

        expect(result).toBe(true);
        expect(jwt.verifyAsync).not.toHaveBeenCalled();
    });

    it('returns true and attaches user for valid Bearer token', async () => {
        const reflector = mockReflector(false);
        const jwt = mockJwt({ sub: 'u-1', email: 'a@b.com' });
        const guard = new JwtAuthGuard(jwt as any, reflector as any, mockConfig() as any);
        const ctx = makeContext('Bearer valid-token') as any;

        const result = await guard.canActivate(ctx);

        expect(result).toBe(true);
        expect(jwt.verifyAsync).toHaveBeenCalledWith('valid-token', expect.any(Object));
    });

    it('throws UnauthorizedException when no authorization header', async () => {
        const reflector = mockReflector(false);
        const jwt = mockJwt();
        const guard = new JwtAuthGuard(jwt as any, reflector as any, mockConfig() as any);

        await expect(guard.canActivate(makeContext(undefined) as any)).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException when authorization is not Bearer', async () => {
        const reflector = mockReflector(false);
        const jwt = mockJwt();
        const guard = new JwtAuthGuard(jwt as any, reflector as any, mockConfig() as any);

        await expect(guard.canActivate(makeContext('Basic abc123') as any)).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException when token is invalid/expired', async () => {
        const reflector = mockReflector(false);
        const jwt = mockJwt(undefined, true);
        const guard = new JwtAuthGuard(jwt as any, reflector as any, mockConfig() as any);

        await expect(guard.canActivate(makeContext('Bearer bad-token') as any)).rejects.toThrow(UnauthorizedException);
    });
});
