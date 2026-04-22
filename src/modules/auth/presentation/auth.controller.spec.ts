import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { RegisterUseCase } from '../application/use-cases/register.usecase';
import { LoginUseCase } from '../application/use-cases/login.usecase';
import { RefreshTokenUseCase } from '../application/use-cases/refresh-token.usecase';

const mockUseCase = (result: any = {}) => ({ execute: jest.fn().mockResolvedValue(result) });

describe('AuthController', () => {
    let controller: AuthController;
    let registerUseCase: { execute: jest.Mock };
    let loginUseCase: { execute: jest.Mock };
    let refreshTokenUseCase: { execute: jest.Mock };

    beforeEach(async () => {
        registerUseCase = mockUseCase({ accessToken: 'at', refreshToken: 'rt' });
        loginUseCase = mockUseCase({ accessToken: 'at', refreshToken: 'rt' });
        refreshTokenUseCase = mockUseCase({ accessToken: 'at2', refreshToken: 'rt2' });

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                { provide: RegisterUseCase, useValue: registerUseCase },
                { provide: LoginUseCase, useValue: loginUseCase },
                { provide: RefreshTokenUseCase, useValue: refreshTokenUseCase },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('register delegates to RegisterUseCase', async () => {
        const result = await controller.register({ email: 'a@b.com', password: 'pass' });
        expect(registerUseCase.execute).toHaveBeenCalledWith({ email: 'a@b.com', password: 'pass' });
        expect(result).toHaveProperty('accessToken');
    });

    it('login delegates to LoginUseCase', async () => {
        const result = await controller.login({ email: 'a@b.com', password: 'pass' });
        expect(loginUseCase.execute).toHaveBeenCalledWith({ email: 'a@b.com', password: 'pass' });
        expect(result).toHaveProperty('accessToken');
    });

    it('refresh delegates to RefreshTokenUseCase', async () => {
        const result = await controller.refresh({ refreshToken: 'tok' });
        expect(refreshTokenUseCase.execute).toHaveBeenCalledWith({ refreshToken: 'tok' });
        expect(result).toHaveProperty('accessToken');
    });
});
