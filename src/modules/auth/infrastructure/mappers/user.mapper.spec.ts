import { UserMapper } from './user.mapper';
import { User } from '../../domain/entities/user.entity';
import { UserRole } from '../../domain/enums/user-role.enum';

const rawUser = {
    id: 'u-1',
    email: 'user@test.com',
    passwordHash: 'hashed',
    refreshTokenHash: 'refresh',
    role: 'ATENDENTE' as any,
    createdAt: new Date('2024-01-01'),
};

describe('UserMapper', () => {
    describe('toDomain()', () => {
        it('maps all fields correctly', () => {
            const user = UserMapper.toDomain(rawUser as any);
            expect(user.id).toBe('u-1');
            expect(user.email).toBe('user@test.com');
            expect(user.passwordHash).toBe('hashed');
            expect(user.refreshTokenHash).toBe('refresh');
            expect(user.role).toBe(UserRole.ATENDENTE);
        });

        it('handles null refreshTokenHash', () => {
            const user = UserMapper.toDomain({ ...rawUser, refreshTokenHash: null } as any);
            expect(user.refreshTokenHash).toBeNull();
        });

        it('maps ADMIN role correctly', () => {
            const user = UserMapper.toDomain({ ...rawUser, role: 'ADMIN' } as any);
            expect(user.role).toBe(UserRole.ADMIN);
        });

        it('maps MECANICO role correctly', () => {
            const user = UserMapper.toDomain({ ...rawUser, role: 'MECANICO' } as any);
            expect(user.role).toBe(UserRole.MECANICO);
        });
    });

    describe('toPrisma()', () => {
        it('maps domain to prisma shape', () => {
            const user = User.restore({ ...rawUser, role: UserRole.ATENDENTE, refreshTokenHash: 'refresh' });
            const prisma = UserMapper.toPrisma(user);
            expect(prisma.id).toBe('u-1');
            expect(prisma.email).toBe('user@test.com');
            expect(prisma.passwordHash).toBe('hashed');
            expect(prisma.refreshTokenHash).toBe('refresh');
            expect(prisma.role).toBe('ATENDENTE');
        });

        it('maps ADMIN role to prisma', () => {
            const user = User.restore({ ...rawUser, role: UserRole.ADMIN, refreshTokenHash: null });
            const prisma = UserMapper.toPrisma(user);
            expect(prisma.role).toBe('ADMIN');
        });
    });
});
