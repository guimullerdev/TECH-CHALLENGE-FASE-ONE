import { UserMapper } from './user.mapper';
import { User } from '../../domain/entities/user.entity';

const rawUser = {
    id: 'u-1',
    email: 'user@test.com',
    passwordHash: 'hashed',
    refreshTokenHash: 'refresh',
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
        });

        it('handles null refreshTokenHash', () => {
            const user = UserMapper.toDomain({ ...rawUser, refreshTokenHash: null } as any);
            expect(user.refreshTokenHash).toBeNull();
        });
    });

    describe('toPrisma()', () => {
        it('maps domain to prisma shape', () => {
            const user = User.restore({ ...rawUser, refreshTokenHash: 'refresh' });
            const prisma = UserMapper.toPrisma(user);
            expect(prisma.id).toBe('u-1');
            expect(prisma.email).toBe('user@test.com');
            expect(prisma.passwordHash).toBe('hashed');
            expect(prisma.refreshTokenHash).toBe('refresh');
        });
    });
});
