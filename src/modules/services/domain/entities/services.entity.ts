import { Preco } from '../value-objects/preco.vo';
import { DescricaoServico } from '../value-objects/descricao-servico.vo';

export class Servico {
    private readonly _precoBase: Preco;
    private readonly _descricao: DescricaoServico | undefined;

    private constructor(
        public readonly id: string,
        public readonly nome: string,
        precoBase: Preco,
        descricao: DescricaoServico | undefined,
        public readonly tempoEstimado: number | undefined,
        public readonly ativo: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {
        this._precoBase = precoBase;
        this._descricao = descricao;
    }

    get precoBase(): number { return this._precoBase.getValue(); }
    get descricao(): string | undefined { return this._descricao?.getValue(); }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            precoBase: this.precoBase,
            descricao: this.descricao,
            tempoEstimado: this.tempoEstimado,
            ativo: this.ativo,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    static create(props: { nome: string; precoBase: number; descricao?: string; tempoEstimado?: number }): Servico {
        const descricao = props.descricao ? DescricaoServico.create(props.descricao) : undefined;
        return new Servico(
            crypto.randomUUID(),
            props.nome,
            Preco.create(props.precoBase),
            descricao,
            props.tempoEstimado,
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
        tempoEstimado?: number;
        ativo: boolean;
        createdAt: Date;
        updatedAt: Date;
    }): Servico {
        const descricao = props.descricao ? DescricaoServico.restore(props.descricao) : undefined;
        return new Servico(props.id, props.nome, Preco.restore(props.precoBase), descricao, props.tempoEstimado, props.ativo, props.createdAt, props.updatedAt);
    }

    update(props: Partial<{ nome: string; precoBase: number; descricao: string; tempoEstimado: number }>): Servico {
        const preco = props.precoBase !== undefined ? Preco.create(props.precoBase) : this._precoBase;
        const descricao = props.descricao !== undefined ? DescricaoServico.create(props.descricao) : this._descricao;
        return new Servico(
            this.id,
            props.nome ?? this.nome,
            preco,
            descricao,
            props.tempoEstimado !== undefined ? props.tempoEstimado : this.tempoEstimado,
            this.ativo,
            this.createdAt,
            new Date(),
        );
    }

    deactivate(): Servico {
        return new Servico(this.id, this.nome, this._precoBase, this._descricao, this.tempoEstimado, false, this.createdAt, new Date());
    }

    reactivate(): Servico {
        return new Servico(this.id, this.nome, this._precoBase, this._descricao, this.tempoEstimado, true, this.createdAt, new Date());
    }
}
