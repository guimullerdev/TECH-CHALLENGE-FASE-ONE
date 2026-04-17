import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import type { UserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class RefreshTokenUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly repo: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async execute(dto: RefreshTokenDto): Promise<AuthResponseDto> {
        let payload: { sub: string; email: string };
        try {
            payload = await this.jwtService.verifyAsync(dto.refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET ?? process.env.JWT_SECRET + '_refresh',
            });
        } catch {
            throw new UnauthorizedException('Refresh token inválido ou expirado');
        }

        const user = await this.repo.findById(payload.sub);
        if (!user || !user.refreshTokenHash) throw new UnauthorizedException('Sessão encerrada');

        const tokenMatch = await bcrypt.compare(dto.refreshToken, user.refreshTokenHash);
        if (!tokenMatch) throw new UnauthorizedException('Refresh token inválido');

        const tokens = await this.generateTokens(user.id, user.email);
        const refreshHash = await bcrypt.hash(tokens.refreshToken, 10);
        await this.repo.updateRefreshToken(user.id, refreshHash);

        return tokens;
    }

    private async generateTokens(userId: string, email: string): Promise<AuthResponseDto> {
        const payload = { sub: userId, email };
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
