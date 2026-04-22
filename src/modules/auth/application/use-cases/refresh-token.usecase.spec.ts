import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RefreshTokenUseCase } from './refresh-token.usecase';
import { User } from '../../domain/entities/user.entity';
import type { UserRepository } from '../../domain/repositories/user.repository.interface';

const mockRepo = (): jest.Mocked<UserRepository> => ({
    findByEmail: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateRefreshToken: jest.fn(),
});

const mockJwt = (payload?: object) => ({
    verifyAsync: jest.fn().mockResolvedValue(payload ?? { sub: 'u-1', email: 'a@b.com' }),
    signAsync: jest.fn().mockResolvedValue('new-token'),
});

describe('RefreshTokenUseCase', () => {
    it('returns new tokens on valid refresh token', async () => {
        const repo = mockRepo();
        const refreshToken = 'some-refresh-token';
        const hash = await bcrypt.hash(refreshToken, 1);
        const jwt = mockJwt({ sub: 'u-1', email: 'a@b.com' });
        const user = User.restore({ id: 'u-1', email: 'a@b.com', passwordHash: 'hash', refreshTokenHash: hash, createdAt: new Date() });
        repo.findById.mockResolvedValue(user);
        repo.updateRefreshToken.mockResolvedValue();

        const useCase = new RefreshTokenUseCase(repo as any, jwt as any);
        const result = await useCase.execute({ refreshToken });

        expect(result).toHaveProperty('accessToken');
        expect(result).toHaveProperty('refreshToken');
    });

    it('throws UnauthorizedException if jwt.verifyAsync throws', async () => {
        const repo = mockRepo();
        const jwt = { verifyAsync: jest.fn().mockRejectedValue(new Error('expired')), signAsync: jest.fn() };

        const useCase = new RefreshTokenUseCase(repo as any, jwt as any);
        await expect(useCase.execute({ refreshToken: 'bad' })).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException if user not found', async () => {
        const repo = mockRepo();
        const jwt = mockJwt({ sub: 'u-1', email: 'a@b.com' });
        repo.findById.mockResolvedValue(null);

        const useCase = new RefreshTokenUseCase(repo as any, jwt as any);
        await expect(useCase.execute({ refreshToken: 'tok' })).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException if refreshTokenHash is null', async () => {
        const repo = mockRepo();
        const jwt = mockJwt({ sub: 'u-1', email: 'a@b.com' });
        const user = User.restore({ id: 'u-1', email: 'a@b.com', passwordHash: 'hash', refreshTokenHash: null, createdAt: new Date() });
        repo.findById.mockResolvedValue(user);

        const useCase = new RefreshTokenUseCase(repo as any, jwt as any);
        await expect(useCase.execute({ refreshToken: 'tok' })).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException if token does not match stored hash', async () => {
        const repo = mockRepo();
        const jwt = mockJwt({ sub: 'u-1', email: 'a@b.com' });
        const hash = await bcrypt.hash('different-token', 1);
        const user = User.restore({ id: 'u-1', email: 'a@b.com', passwordHash: 'hash', refreshTokenHash: hash, createdAt: new Date() });
        repo.findById.mockResolvedValue(user);

        const useCase = new RefreshTokenUseCase(repo as any, jwt as any);
        await expect(useCase.execute({ refreshToken: 'wrong-token' })).rejects.toThrow(UnauthorizedException);
    });
});
