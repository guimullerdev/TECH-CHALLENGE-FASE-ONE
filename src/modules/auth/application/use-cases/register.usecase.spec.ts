import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUseCase } from './register.usecase';
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

describe('RegisterUseCase', () => {
    it('creates a user and returns tokens', async () => {
        const repo = mockRepo();
        const jwt = mockJwt();
        repo.findByEmail.mockResolvedValue(null);
        const user = User.restore({ id: 'u-1', email: 'a@b.com', passwordHash: 'hash', refreshTokenHash: null, createdAt: new Date() });
        repo.create.mockResolvedValue(user);
        repo.updateRefreshToken.mockResolvedValue();

        const useCase = new RegisterUseCase(repo as any, jwt as any);
        const result = await useCase.execute({ email: 'a@b.com', password: 'pass123' });

        expect(repo.findByEmail).toHaveBeenCalledWith('a@b.com');
        expect(repo.create).toHaveBeenCalledTimes(1);
        expect(result).toHaveProperty('accessToken');
        expect(result).toHaveProperty('refreshToken');
    });

    it('throws ConflictException if email already exists', async () => {
        const repo = mockRepo();
        const jwt = mockJwt();
        const user = User.restore({ id: 'u-1', email: 'a@b.com', passwordHash: 'hash', refreshTokenHash: null, createdAt: new Date() });
        repo.findByEmail.mockResolvedValue(user);

        const useCase = new RegisterUseCase(repo as any, jwt as any);
        await expect(useCase.execute({ email: 'a@b.com', password: 'pass123' })).rejects.toThrow(ConflictException);
    });
});
