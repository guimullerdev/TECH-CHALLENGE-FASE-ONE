import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../../domain/entities/user.entity';
import type { UserRepository } from '../../domain/repositories/user.repository.interface';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserPrismaRepository implements UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByEmail(email: string): Promise<User | null> {
        const raw = await this.prisma.user.findUnique({ where: { email } });
        return raw ? UserMapper.toDomain(raw) : null;
    }

    async findById(id: string): Promise<User | null> {
        const raw = await this.prisma.user.findUnique({ where: { id } });
        return raw ? UserMapper.toDomain(raw) : null;
    }

    async create(user: User): Promise<User> {
        const raw = await this.prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                passwordHash: user.passwordHash,
                refreshTokenHash: user.refreshTokenHash,
                role: user.role,
                createdAt: user.createdAt,
            },
        });
        return UserMapper.toDomain(raw);
    }

    async updateRefreshToken(id: string, refreshTokenHash: string | null): Promise<void> {
        await this.prisma.user.update({ where: { id }, data: { refreshTokenHash } });
    }
}
