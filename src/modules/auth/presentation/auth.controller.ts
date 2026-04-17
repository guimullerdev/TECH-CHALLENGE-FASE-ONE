import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RegisterUseCase } from '../application/use-cases/register.usecase';
import { LoginUseCase } from '../application/use-cases/login.usecase';
import { RefreshTokenUseCase } from '../application/use-cases/refresh-token.usecase';
import { RegisterDto } from '../application/dto/register.dto';
import { LoginDto } from '../application/dto/login.dto';
import { RefreshTokenDto } from '../application/dto/refresh-token.dto';
import { AuthResponseDto } from '../application/dto/auth-response.dto';
import { Public } from '../decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase,
    ) { }

    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Registrar novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado; retorna accessToken e refreshToken', type: AuthResponseDto })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 409, description: 'Email já cadastrado' })
    register(@Body() dto: RegisterDto): Promise<AuthResponseDto> {
        return this.registerUseCase.execute(dto);
    }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Autenticar usuário' })
    @ApiResponse({ status: 200, description: 'Login bem-sucedido; retorna accessToken e refreshToken', type: AuthResponseDto })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
        return this.loginUseCase.execute(dto);
    }

    @Public()
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Renovar access token usando refresh token' })
    @ApiResponse({ status: 200, description: 'Novo accessToken emitido', type: AuthResponseDto })
    @ApiResponse({ status: 401, description: 'Refresh token inválido ou expirado' })
    refresh(@Body() dto: RefreshTokenDto): Promise<AuthResponseDto> {
        return this.refreshTokenUseCase.execute(dto);
    }
}
