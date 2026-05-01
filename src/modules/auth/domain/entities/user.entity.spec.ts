import { User } from './user.entity';
import { UserRole } from '../enums/user-role.enum';

describe('User entity', () => {
    describe('create()', () => {
        it('creates user with default ATENDENTE role', () => {
            const user = User.create({ email: 'test@test.com', passwordHash: 'hash' });
            expect(user.role).toBe(UserRole.ATENDENTE);
            expect(user.refreshTokenHash).toBeNull();
        });

        it('creates user with explicit role', () => {
            const user = User.create({ email: 'admin@test.com', passwordHash: 'hash', role: UserRole.ADMIN });
            expect(user.role).toBe(UserRole.ADMIN);
        });

        it('throws for invalid email', () => {
            expect(() => User.create({ email: 'invalid', passwordHash: 'hash' })).toThrow('Email');
        });
    });

    describe('withRefreshToken()', () => {
        it('returns a new user with the refresh token hash set', () => {
            const user = User.create({ email: 'a@b.com', passwordHash: 'hash' });
            const updated = user.withRefreshToken('some-hash');
            expect(updated.refreshTokenHash).toBe('some-hash');
            expect(updated.id).toBe(user.id);
        });
    });

    describe('clearRefreshToken()', () => {
        it('returns a new user with refreshTokenHash set to null', () => {
            const user = User.create({ email: 'a@b.com', passwordHash: 'hash' });
            const withToken = user.withRefreshToken('token-hash');
            const cleared = withToken.clearRefreshToken();
            expect(cleared.refreshTokenHash).toBeNull();
        });
    });
});
