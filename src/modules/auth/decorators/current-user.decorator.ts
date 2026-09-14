import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { CLIENTE_ROLE, TokenRole } from '../domain/enums/user-role.enum';

/**
 * Claims do JWT já validado pelo `JwtAuthGuard`.
 *
 * `sub` aponta para um `User` quando a role é de staff, e para um `Cliente`
 * quando é `CLIENTE` — nesse caso o token vem da `oficina-auth-lambda` e
 * traz também o `documento` (ver ADR 0001).
 */
export interface AuthenticatedActor {
    sub: string;
    role: TokenRole;
    email?: string;
    documento?: string;
}

export const CurrentUser = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): AuthenticatedActor => {
        const request = ctx.switchToHttp().getRequest<Request>();
        return (request as unknown as { user: AuthenticatedActor }).user;
    },
);

export function isCliente(actor: AuthenticatedActor | undefined): boolean {
    return actor?.role === CLIENTE_ROLE;
}
