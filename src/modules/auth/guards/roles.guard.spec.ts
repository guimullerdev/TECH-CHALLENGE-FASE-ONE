import { ForbiddenException } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { UserRole } from '../domain/enums/user-role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

const makeContext = (userRole?: UserRole) => ({
    getHandler: jest.fn(),
    getClass: jest.fn(),
    switchToHttp: () => ({
        getRequest: () => ({
            user: userRole ? { sub: 'u-1', email: 'a@b.com', role: userRole } : undefined,
        }),
    }),
});

const makeReflector = (isPublic: boolean, roles: UserRole[] | undefined) => ({
    getAllAndOverride: jest.fn((key: string) => {
        if (key === IS_PUBLIC_KEY) return isPublic;
        if (key === ROLES_KEY) return roles;
        return undefined;
    }),
});

describe('RolesGuard', () => {
    it('allows public routes regardless of role', () => {
        const reflector = makeReflector(true, [UserRole.ADMIN]);
        const guard = new RolesGuard(reflector as any);
        expect(guard.canActivate(makeContext() as any)).toBe(true);
    });

    it('allows routes with no @Roles() decorator', () => {
        const reflector = makeReflector(false, undefined);
        const guard = new RolesGuard(reflector as any);
        expect(guard.canActivate(makeContext(UserRole.ATENDENTE) as any)).toBe(true);
    });

    it('allows routes with empty @Roles() list', () => {
        const reflector = makeReflector(false, []);
        const guard = new RolesGuard(reflector as any);
        expect(guard.canActivate(makeContext(UserRole.ATENDENTE) as any)).toBe(true);
    });

    it('allows ADMIN to access ADMIN-only route', () => {
        const reflector = makeReflector(false, [UserRole.ADMIN]);
        const guard = new RolesGuard(reflector as any);
        expect(guard.canActivate(makeContext(UserRole.ADMIN) as any)).toBe(true);
    });

    it('throws ForbiddenException when ATENDENTE tries ADMIN-only route', () => {
        const reflector = makeReflector(false, [UserRole.ADMIN]);
        const guard = new RolesGuard(reflector as any);
        expect(() => guard.canActivate(makeContext(UserRole.ATENDENTE) as any)).toThrow(ForbiddenException);
    });

    it('throws ForbiddenException when MECANICO tries ADMIN-only route', () => {
        const reflector = makeReflector(false, [UserRole.ADMIN]);
        const guard = new RolesGuard(reflector as any);
        expect(() => guard.canActivate(makeContext(UserRole.MECANICO) as any)).toThrow(ForbiddenException);
    });

    it('allows MECANICO to access MECANICO|ADMIN route', () => {
        const reflector = makeReflector(false, [UserRole.MECANICO, UserRole.ADMIN]);
        const guard = new RolesGuard(reflector as any);
        expect(guard.canActivate(makeContext(UserRole.MECANICO) as any)).toBe(true);
    });

    it('allows ADMIN to access MECANICO|ADMIN route', () => {
        const reflector = makeReflector(false, [UserRole.MECANICO, UserRole.ADMIN]);
        const guard = new RolesGuard(reflector as any);
        expect(guard.canActivate(makeContext(UserRole.ADMIN) as any)).toBe(true);
    });

    it('throws ForbiddenException when ATENDENTE tries MECANICO|ADMIN route', () => {
        const reflector = makeReflector(false, [UserRole.MECANICO, UserRole.ADMIN]);
        const guard = new RolesGuard(reflector as any);
        expect(() => guard.canActivate(makeContext(UserRole.ATENDENTE) as any)).toThrow(ForbiddenException);
    });

    it('throws ForbiddenException when user has no role in token', () => {
        const reflector = makeReflector(false, [UserRole.ADMIN]);
        const guard = new RolesGuard(reflector as any);
        expect(() => guard.canActivate(makeContext(undefined) as any)).toThrow(ForbiddenException);
    });
});
