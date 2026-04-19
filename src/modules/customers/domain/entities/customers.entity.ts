export class Cliente {
    private constructor(
        public readonly id: string,
        public readonly nome: string,
        public readonly cpf: string,
        public readonly telefone: string | undefined,
        public readonly email: string | undefined,
        public readonly endereco: string | undefined,
        public readonly ativo: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    static create(props: {
        nome: string;
        cpf: string;
        telefone?: string;
        email?: string;
        endereco?: string;
    }): Cliente {
        if (props.email && !props.email.includes('@')) throw new Error('Email inválido');
        return new Cliente(
            crypto.randomUUID(),
            props.nome,
            props.cpf,
            props.telefone,
            props.email,
            props.endereco,
            true,
            new Date(),
            new Date(),
        );
    }

    static restore(props: {
        id: string;
        nome: string;
        cpf: string;
        telefone?: string;
        email?: string;
        endereco?: string;
        ativo: boolean;
        createdAt: Date;
        updatedAt: Date;
    }): Cliente {
        return new Cliente(
            props.id,
            props.nome,
            props.cpf,
            props.telefone,
            props.email,
            props.endereco,
            props.ativo,
            props.createdAt,
            props.updatedAt,
        );
    }

    update(props: Partial<{ nome: string; telefone: string; email: string; endereco: string }>): Cliente {
        if (props.email && !props.email.includes('@')) throw new Error('Email inválido');
        return new Cliente(
            this.id,
            props.nome ?? this.nome,
            this.cpf,
            props.telefone ?? this.telefone,
            props.email ?? this.email,
            props.endereco ?? this.endereco,
            this.ativo,
            this.createdAt,
            new Date(),
        );
    }

    deactivate(): Cliente {
        return new Cliente(this.id, this.nome, this.cpf, this.telefone, this.email, this.endereco, false, this.createdAt, new Date());
    }

    reactivate(): Cliente {
        return new Cliente(this.id, this.nome, this.cpf, this.telefone, this.email, this.endereco, true, this.createdAt, new Date());
    }
}
