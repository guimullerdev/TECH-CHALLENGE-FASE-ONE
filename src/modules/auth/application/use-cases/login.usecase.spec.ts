import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginUseCase } from './login.usecase';
import { User } from '../../domain/entities/user.entity';
import type { UserRepository } from '../../domain/repositories/user.repository.interface';

const mockRepo = (): jest.Mocked<UserRepository> => ({
    findByEmail: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateRefreshToken: jest.fn(),
});

const mockJwt = () => ({
    signAsync: jest.fn().mockResolvedValue('token'),
});

const mockConfig = () => ({
    get: jest.fn(),
});

describe('LoginUseCase', () => {
    it('returns tokens on valid credentials', async () => {
        const repo = mockRepo();
        const jwt = mockJwt();
        const config = mockConfig();
        const hash = await bcrypt.hash('pass123', 1);
        const user = User.restore({ id: 'u-1', email: 'a@b.com', passwordHash: hash, refreshTokenHash: null, createdAt: new Date() });
        repo.findByEmail.mockResolvedValue(user);
        repo.updateRefreshToken.mockResolvedValue();

        const useCase = new LoginUseCase(repo as any, jwt as any, config as any);
        const result = await useCase.execute({ email: 'a@b.com', password: 'pass123' });

        expect(result).toHaveProperty('accessToken');
        expect(result).toHaveProperty('refreshToken');
    });

    it('throws UnauthorizedException if user not found', async () => {
        const repo = mockRepo();
        const jwt = mockJwt();
        const config = mockConfig();
        repo.findByEmail.mockResolvedValue(null);

        const useCase = new LoginUseCase(repo as any, jwt as any, config as any);
        await expect(useCase.execute({ email: 'a@b.com', password: 'pass123' })).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException if password does not match', async () => {
        const repo = mockRepo();
        const jwt = mockJwt();
        const config = mockConfig();
        const hash = await bcrypt.hash('other', 1);
        const user = User.restore({ id: 'u-1', email: 'a@b.com', passwordHash: hash, refreshTokenHash: null, createdAt: new Date() });
        repo.findByEmail.mockResolvedValue(user);

        const useCase = new LoginUseCase(repo as any, jwt as any, config as any);
        await expect(useCase.execute({ email: 'a@b.com', password: 'wrong' })).rejects.toThrow(UnauthorizedException);
    });
});
