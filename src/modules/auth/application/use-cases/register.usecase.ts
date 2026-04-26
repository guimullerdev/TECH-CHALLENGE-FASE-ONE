import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { User } from '../../domain/entities/user.entity';
import { UserRole } from '../../domain/enums/user-role.enum';
import type { UserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class RegisterUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly repo: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async execute(dto: RegisterDto): Promise<AuthResponseDto> {
        const existing = await this.repo.findByEmail(dto.email);
        if (existing) throw new ConflictException('Email já cadastrado');

        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = User.create({ email: dto.email, passwordHash, role: dto.role });

        const savedUser = await this.repo.create(user);

        const tokens = await this.generateTokens(savedUser.id, savedUser.email, savedUser.role);
        const refreshHash = await bcrypt.hash(tokens.refreshToken, 10);
        await this.repo.updateRefreshToken(savedUser.id, refreshHash);

        return tokens;
    }

    private async generateTokens(userId: string, email: string, role: UserRole): Promise<AuthResponseDto> {
        const payload = { sub: userId, email, role };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                expiresIn: (process.env.JWT_EXPIRES_IN ?? '1h') as any,
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_REFRESH_SECRET ?? process.env.JWT_SECRET + '_refresh',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                expiresIn: '7d' as any,
            }),
        ]);
        return { accessToken, refreshToken };
    }
}
