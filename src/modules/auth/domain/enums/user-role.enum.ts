/**
 * Perfis internos da oficina. Corresponde 1:1 ao enum `UserRole` do Prisma —
 * são as roles que existem como linha na tabela `users`.
 */
export enum UserRole {
    ADMIN = 'ADMIN',
    ATENDENTE = 'ATENDENTE',
    MECANICO = 'MECANICO',
}

/**
 * Perfil do cliente da oficina.
 *
 * Fica fora de `UserRole` de propósito: o cliente não é um `User` e nunca
 * tem senha. O token com essa role é emitido pela `oficina-auth-lambda` a
 * partir do CPF, e o `sub` dele aponta para um `Cliente`, não para um
 * `User` (ver ADR 0001 e RFC 0003). Se `CLIENTE` entrasse no enum acima, o
 * Prisma passaria a aceitar criar usuários com esse perfil — que é
 * exatamente o que não pode acontecer.
 */
export const CLIENTE_ROLE = 'CLIENTE' as const;

/**
 * Tudo que pode aparecer na claim `role` de um JWT: os perfis de staff
 * (token emitido pelo `login.usecase`) mais o de cliente (token emitido
 * pela Lambda). É o tipo com que os guards trabalham.
 */
export type TokenRole = UserRole | typeof CLIENTE_ROLE;

/** Perfis internos da oficina — quem opera o sistema. */
export const STAFF_ROLES: readonly TokenRole[] = [
    UserRole.ADMIN,
    UserRole.ATENDENTE,
    UserRole.MECANICO,
];

export function isStaff(role: TokenRole | undefined): boolean {
    return role !== undefined && STAFF_ROLES.includes(role);
}
