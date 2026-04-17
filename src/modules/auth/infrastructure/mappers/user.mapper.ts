import { User as PrismaUser } from '@prisma/client';
import { User } from '../../domain/entities/user.entity';

export class UserMapper {
    static toDomain(raw: PrismaUser): User {
        return User.restore({
            id: raw.id,
            email: raw.email,
            passwordHash: raw.passwordHash,
            refreshTokenHash: raw.refreshTokenHash,
            createdAt: raw.createdAt,
        });
    }

    static toPrisma(user: User): Omit<PrismaUser, 'createdAt'> & { createdAt?: Date } {
        return {
            id: user.id,
            email: user.email,
            passwordHash: user.passwordHash,
            refreshTokenHash: user.refreshTokenHash,
            createdAt: user.createdAt,
        };
    }
}
