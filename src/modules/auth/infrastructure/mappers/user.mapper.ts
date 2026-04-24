import { User as PrismaUser, UserRole as PrismaUserRole } from '@prisma/client';
import { User } from '../../domain/entities/user.entity';
import { UserRole } from '../../domain/enums/user-role.enum';

export class UserMapper {
    static toDomain(raw: PrismaUser): User {
        return User.restore({
            id: raw.id,
            email: raw.email,
            passwordHash: raw.passwordHash,
            refreshTokenHash: raw.refreshTokenHash,
            role: raw.role as unknown as UserRole,
            createdAt: raw.createdAt,
        });
    }

    static toPrisma(user: User): Omit<PrismaUser, 'createdAt'> & { createdAt?: Date } {
        return {
            id: user.id,
            email: user.email,
            passwordHash: user.passwordHash,
            refreshTokenHash: user.refreshTokenHash,
            role: user.role as unknown as PrismaUserRole,
            createdAt: user.createdAt,
        };
    }
}
