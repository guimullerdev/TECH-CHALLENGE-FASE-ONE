import { SetMetadata } from '@nestjs/common';
import { TokenRole } from '../domain/enums/user-role.enum';

export const ROLES_KEY = 'roles';

/**
 * Restringe a rota aos perfis informados. Aceita tanto os perfis de staff
 * (`UserRole`) quanto `CLIENTE_ROLE`, já que os dois podem aparecer na claim
 * `role` do JWT — o de staff vindo do login por email/senha, o de cliente
 * vindo da Lambda de autenticação por CPF.
 */
export const Roles = (...roles: TokenRole[]) => SetMetadata(ROLES_KEY, roles);
