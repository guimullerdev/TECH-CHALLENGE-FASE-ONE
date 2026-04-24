import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../domain/enums/user-role.enum';

export class RegisterDto {
    @ApiProperty({ example: 'mecanico@oficina.com' })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @ApiProperty({ example: 'senha123', minLength: 6 })
    @IsString()
    @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
    password: string;

    @ApiProperty({ enum: UserRole, default: UserRole.ATENDENTE, required: false })
    @IsOptional()
    @IsEnum(UserRole, { message: 'Role inválida. Use: ADMIN, ATENDENTE ou MECANICO' })
    role?: UserRole;
}
