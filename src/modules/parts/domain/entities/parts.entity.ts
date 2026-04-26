import { Preco } from '../value-objects/preco.vo';
import { DescricaoPeca } from '../value-objects/descricao-peca.vo';

export class Peca {
    private readonly _precoUnitario: Preco;
    private readonly _descricao: DescricaoPeca | undefined;

    private constructor(
        public readonly id: string,
        public readonly nome: string,
        precoUnitario: Preco,
        public readonly qtdTotal: number,
        public readonly qtdDisponivel: number,
        public readonly qtdReservada: number,
        public readonly codigo: string | undefined,
        descricao: DescricaoPeca | undefined,
        public readonly ativo: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {
        this._precoUnitario = precoUnitario;
        this._descricao = descricao;
    }

    get precoUnitario(): number { return this._precoUnitario.getValue(); }
    get descricao(): string | undefined { return this._descricao?.getValue(); }

    static create(props: {
        nome: string;
        precoUnitario: number;
        qtdTotal?: number;
        codigo?: string;
        descricao?: string;
    }): Peca {
        const qtdTotal = props.qtdTotal ?? 0;
        if (qtdTotal < 0) throw new Error('Quantidade em estoque não pode ser negativa');
        const descricao = props.descricao ? DescricaoPeca.create(props.descricao) : undefined;
        return new Peca(
            crypto.randomUUID(),
            props.nome,
            Preco.create(props.precoUnitario),
            qtdTotal,
            qtdTotal,
            0,
            props.codigo,
            descricao,
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
        const descricao = props.descricao ? DescricaoPeca.restore(props.descricao) : undefined;
        return new Peca(
            props.id,
            props.nome,
            Preco.restore(props.precoUnitario),
            props.qtdTotal,
            props.qtdDisponivel,
            props.qtdReservada,
            props.codigo,
            descricao,
            props.ativo,
            props.createdAt,
            props.updatedAt,
        );
    }

    update(props: Partial<{ nome: string; precoUnitario: number; codigo: string; descricao: string }>): Peca {
        const preco = props.precoUnitario !== undefined ? Preco.create(props.precoUnitario) : this._precoUnitario;
        const descricao = props.descricao !== undefined ? DescricaoPeca.create(props.descricao) : this._descricao;
        return new Peca(
            this.id,
            props.nome ?? this.nome,
            preco,
            this.qtdTotal,
            this.qtdDisponivel,
            this.qtdReservada,
            props.codigo ?? this.codigo,
            descricao,
            this.ativo,
            this.createdAt,
            new Date(),
        );
    }

    deactivate(): Peca {
        return new Peca(this.id, this.nome, this._precoUnitario, this.qtdTotal, this.qtdDisponivel, this.qtdReservada, this.codigo, this._descricao, false, this.createdAt, new Date());
    }

    reactivate(): Peca {
        return new Peca(this.id, this.nome, this._precoUnitario, this.qtdTotal, this.qtdDisponivel, this.qtdReservada, this.codigo, this._descricao, true, this.createdAt, new Date());
    }
}
