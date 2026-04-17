export class User {
    private constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly passwordHash: string,
        public readonly refreshTokenHash: string | null,
        public readonly createdAt: Date,
    ) { }

    static create(props: { email: string; passwordHash: string }): User {
        if (!props.email.includes('@')) throw new Error('Email inválido');
        return new User(crypto.randomUUID(), props.email, props.passwordHash, null, new Date());
    }

    static restore(props: {
        id: string;
        email: string;
        passwordHash: string;
        refreshTokenHash: string | null;
        createdAt: Date;
    }): User {
        return new User(props.id, props.email, props.passwordHash, props.refreshTokenHash, props.createdAt);
    }

    withRefreshToken(refreshTokenHash: string): User {
        return new User(this.id, this.email, this.passwordHash, refreshTokenHash, this.createdAt);
    }

    clearRefreshToken(): User {
        return new User(this.id, this.email, this.passwordHash, null, this.createdAt);
    }
}
