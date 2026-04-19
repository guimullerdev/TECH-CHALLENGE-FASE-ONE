export class Servico {
    private constructor(
        public readonly id: string,
        public readonly nome: string,
        public readonly precoBase: number,
        public readonly descricao: string | undefined,
        public readonly ativo: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    static create(props: { nome: string; precoBase: number; descricao?: string }): Servico {
        if (props.precoBase < 0) throw new Error('Preço não pode ser negativo');
        return new Servico(
            crypto.randomUUID(),
            props.nome,
            props.precoBase,
            props.descricao,
            true,
            new Date(),
            new Date(),
        );
    }

    static restore(props: {
        id: string;
        nome: string;
        precoBase: number;
        descricao?: string;
        ativo: boolean;
        createdAt: Date;
        updatedAt: Date;
    }): Servico {
        return new Servico(props.id, props.nome, props.precoBase, props.descricao, props.ativo, props.createdAt, props.updatedAt);
    }

    update(props: Partial<{ nome: string; precoBase: number; descricao: string }>): Servico {
        if (props.precoBase !== undefined && props.precoBase < 0) throw new Error('Preço não pode ser negativo');
        return new Servico(
            this.id,
            props.nome ?? this.nome,
            props.precoBase ?? this.precoBase,
            props.descricao ?? this.descricao,
            this.ativo,
            this.createdAt,
            new Date(),
        );
    }

    deactivate(): Servico {
        return new Servico(this.id, this.nome, this.precoBase, this.descricao, false, this.createdAt, new Date());
    }

    reactivate(): Servico {
        return new Servico(this.id, this.nome, this.precoBase, this.descricao, true, this.createdAt, new Date());
    }
}
