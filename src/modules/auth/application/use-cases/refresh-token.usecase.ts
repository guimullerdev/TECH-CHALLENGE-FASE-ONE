import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { UserRole } from '../../domain/enums/user-role.enum';
import type { UserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class RefreshTokenUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly repo: UserRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async execute(dto: RefreshTokenDto): Promise<AuthResponseDto> {
        let payload: { sub: string; email: string };
        try {
            payload = await this.jwtService.verifyAsync(dto.refreshToken, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET') ?? this.configService.get<string>('JWT_SECRET') + '_refresh',
            });
        } catch {
            throw new UnauthorizedException('Refresh token inválido ou expirado');
        }

        const user = await this.repo.findById(payload.sub);
        if (!user || !user.refreshTokenHash) throw new UnauthorizedException('Sessão encerrada');

        const tokenMatch = await bcrypt.compare(dto.refreshToken, user.refreshTokenHash);
        if (!tokenMatch) throw new UnauthorizedException('Refresh token inválido');

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
