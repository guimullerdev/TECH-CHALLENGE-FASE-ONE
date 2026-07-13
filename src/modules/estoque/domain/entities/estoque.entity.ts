import { Quantidade } from '../value-objects/quantidade.vo';

export class Estoque {
    private readonly _quantidadeDisponivel: Quantidade;
    private readonly _quantidadeReservada: Quantidade;

    private constructor(
        public readonly id: string,
        public readonly pecaId: string,
        quantidadeDisponivel: Quantidade,
        quantidadeReservada: Quantidade,
        public readonly updatedAt: Date,
    ) {
        this._quantidadeDisponivel = quantidadeDisponivel;
        this._quantidadeReservada = quantidadeReservada;
    }

    get quantidadeDisponivel(): number { return this._quantidadeDisponivel.getValue(); }

    get quantidadeReservada(): number { return this._quantidadeReservada.getValue(); }

    get quantidadeTotal(): number { return this._quantidadeDisponivel.getValue() + this._quantidadeReservada.getValue(); }

    toJSON() {
        return {
            id: this.id,
            pecaId: this.pecaId,
            quantidadeDisponivel: this.quantidadeDisponivel,
            quantidadeReservada: this.quantidadeReservada,
            quantidadeTotal: this.quantidadeTotal,
            updatedAt: this.updatedAt,
        };
    }

    static create(props: { pecaId: string; quantidadeInicial?: number }): Estoque {
        const qtd = props.quantidadeInicial ?? 0;
        return new Estoque(
            crypto.randomUUID(),
            props.pecaId,
            Quantidade.create(qtd),
            Quantidade.create(0),
            new Date(),
        );
    }

    static restore(props: {
        id: string;
        pecaId: string;
        quantidadeDisponivel: number;
        quantidadeReservada: number;
        updatedAt: Date;
    }): Estoque {
        return new Estoque(
            props.id,
            props.pecaId,
            Quantidade.restore(props.quantidadeDisponivel),
            Quantidade.restore(props.quantidadeReservada),
            props.updatedAt,
        );
    }

    reservar(quantidade: number): Estoque {
        const qtd = Quantidade.createPositivo(quantidade);
        if (!this._quantidadeDisponivel.isEnough(qtd)) {
            throw new Error(`Estoque insuficiente para peça ${this.pecaId}: disponível ${this.quantidadeDisponivel}, solicitado ${quantidade}`);
        }
        return new Estoque(
            this.id,
            this.pecaId,
            this._quantidadeDisponivel.subtract(qtd),
            this._quantidadeReservada.add(qtd),
            new Date(),
        );
    }

    liberarReserva(quantidade: number): Estoque {
        const qtd = Quantidade.createPositivo(quantidade);
        return new Estoque(
            this.id,
            this.pecaId,
            this._quantidadeDisponivel.add(qtd),
            this._quantidadeReservada.subtract(qtd),
            new Date(),
        );
    }

    darBaixa(quantidade: number): Estoque {
        const qtd = Quantidade.createPositivo(quantidade);
        return new Estoque(
            this.id,
            this.pecaId,
            this._quantidadeDisponivel,
            this._quantidadeReservada.subtract(qtd),
            new Date(),
        );
    }

    entrada(quantidade: number): Estoque {
        const qtd = Quantidade.createPositivo(quantidade);
        return new Estoque(
            this.id,
            this.pecaId,
            this._quantidadeDisponivel.add(qtd),
            this._quantidadeReservada,
            new Date(),
        );
    }
}
