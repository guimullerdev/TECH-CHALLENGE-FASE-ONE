import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '../../prisma/prisma.module';
import { AuthController } from './presentation/auth.controller';
import { RegisterUseCase } from './application/use-cases/register.usecase';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token.usecase';
import { UserPrismaRepository } from './infrastructure/repositories/user-prisma.repository';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [
        RegisterUseCase,
        LoginUseCase,
        RefreshTokenUseCase,
        JwtAuthGuard,
        RolesGuard,
        {
            provide: 'UserRepository',
            useClass: UserPrismaRepository,
        },
    ],
    exports: [JwtAuthGuard, RolesGuard, JwtModule],
})
export class AuthModule { }
