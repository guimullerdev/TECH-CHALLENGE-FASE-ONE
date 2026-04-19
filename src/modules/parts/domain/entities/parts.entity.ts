export class Peca {
    private constructor(
        public readonly id: string,
        public readonly nome: string,
        public readonly precoUnitario: number,
        public readonly qtdTotal: number,
        public readonly qtdDisponivel: number,
        public readonly qtdReservada: number,
        public readonly codigo: string | undefined,
        public readonly descricao: string | undefined,
        public readonly ativo: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    static create(props: {
        nome: string;
        precoUnitario: number;
        qtdTotal?: number;
        codigo?: string;
        descricao?: string;
    }): Peca {
        if (props.precoUnitario < 0) throw new Error('Preço não pode ser negativo');
        const qtdTotal = props.qtdTotal ?? 0;
        if (qtdTotal < 0) throw new Error('Quantidade em estoque não pode ser negativa');
        return new Peca(
            crypto.randomUUID(),
            props.nome,
            props.precoUnitario,
            qtdTotal,
            qtdTotal,
            0,
            props.codigo,
            props.descricao,
            true,
            new Date(),
            new Date(),
        );
    }

    static restore(props: {
        id: string;
        nome: string;
        precoUnitario: number;
        qtdTotal: number;
        qtdDisponivel: number;
        qtdReservada: number;
        codigo?: string;
        descricao?: string;
        ativo: boolean;
        createdAt: Date;
        updatedAt: Date;
    }): Peca {
        return new Peca(
            props.id,
            props.nome,
            props.precoUnitario,
            props.qtdTotal,
            props.qtdDisponivel,
            props.qtdReservada,
            props.codigo,
            props.descricao,
            props.ativo,
            props.createdAt,
            props.updatedAt,
        );
    }

    update(props: Partial<{ nome: string; precoUnitario: number; codigo: string; descricao: string }>): Peca {
        if (props.precoUnitario !== undefined && props.precoUnitario < 0) throw new Error('Preço não pode ser negativo');
        return new Peca(
            this.id,
            props.nome ?? this.nome,
            props.precoUnitario ?? this.precoUnitario,
            this.qtdTotal,
            this.qtdDisponivel,
            this.qtdReservada,
            props.codigo ?? this.codigo,
            props.descricao ?? this.descricao,
            this.ativo,
            this.createdAt,
            new Date(),
        );
    }

    deactivate(): Peca {
        return new Peca(this.id, this.nome, this.precoUnitario, this.qtdTotal, this.qtdDisponivel, this.qtdReservada, this.codigo, this.descricao, false, this.createdAt, new Date());
    }

    reactivate(): Peca {
        return new Peca(this.id, this.nome, this.precoUnitario, this.qtdTotal, this.qtdDisponivel, this.qtdReservada, this.codigo, this.descricao, true, this.createdAt, new Date());
    }
}
