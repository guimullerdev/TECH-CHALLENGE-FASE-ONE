import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { UserRole } from '../../domain/enums/user-role.enum';
import type { UserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly repo: UserRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async execute(dto: LoginDto): Promise<AuthResponseDto> {
        const user = await this.repo.findByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Credenciais inválidas');

        const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);
        if (!passwordMatch) throw new UnauthorizedException('Credenciais inválidas');

        const tokens = await this.generateTokens(user.id, user.email, user.role);
        const refreshHash = await bcrypt.hash(tokens.refreshToken, 10);
        await this.repo.updateRefreshToken(user.id, refreshHash);

        return tokens;
    }

    private async generateTokens(userId: string, email: string, role: UserRole): Promise<AuthResponseDto> {
        const payload = { sub: userId, email, role };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_SECRET'),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                expiresIn: (this.configService.get<string>('JWT_EXPIRES_IN') ?? '1h') as any,
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET') ?? this.configService.get<string>('JWT_SECRET') + '_refresh',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                expiresIn: '7d' as any,
            }),
        ]);
        return { accessToken, refreshToken };
    }
}
