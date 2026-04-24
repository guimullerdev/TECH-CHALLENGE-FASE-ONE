import { UserRole } from '../enums/user-role.enum';

export class User {
    private constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly passwordHash: string,
        public readonly refreshTokenHash: string | null,
        public readonly role: UserRole,
        public readonly createdAt: Date,
    ) { }

    static create(props: { email: string; passwordHash: string; role?: UserRole }): User {
        if (!props.email.includes('@')) throw new Error('Email inválido');
        return new User(
            crypto.randomUUID(),
            props.email,
            props.passwordHash,
            null,
            props.role ?? UserRole.ATENDENTE,
            new Date(),
        );
    }

    static restore(props: {
        id: string;
        email: string;
        passwordHash: string;
        refreshTokenHash: string | null;
        role?: UserRole;
        createdAt: Date;
    }): User {
        return new User(
            props.id,
            props.email,
            props.passwordHash,
            props.refreshTokenHash,
            props.role ?? UserRole.ATENDENTE,
            props.createdAt,
        );
    }

    withRefreshToken(refreshTokenHash: string): User {
        return new User(this.id, this.email, this.passwordHash, refreshTokenHash, this.role, this.createdAt);
    }

    clearRefreshToken(): User {
        return new User(this.id, this.email, this.passwordHash, null, this.role, this.createdAt);
    }
}
