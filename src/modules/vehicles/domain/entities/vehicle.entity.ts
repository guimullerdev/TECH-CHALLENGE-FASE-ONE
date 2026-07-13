import { AnoFabricacao } from '../value-objects/ano-fabricacao.vo';
import { Placa } from '../value-objects/placa.vo';

export class Veiculo {
    private readonly _placa: Placa;
    private readonly _ano: AnoFabricacao | undefined;

    private constructor(
        public readonly id: string,
        placa: Placa,
        public readonly marca: string,
        public readonly modelo: string,
        public readonly clienteId: string,
        ano: AnoFabricacao | undefined,
        public readonly cor: string | undefined,
        public readonly kmAtual: number | undefined,
        public readonly ativo: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {
        this._placa = placa;
        this._ano = ano;
    }

    get placa(): string { return this._placa.getValue(); }
    get ano(): number | undefined { return this._ano?.getValue(); }

    toJSON() {
        return {
            id: this.id,
            placa: this.placa,
            marca: this.marca,
            modelo: this.modelo,
            clienteId: this.clienteId,
            ano: this.ano,
            cor: this.cor,
            kmAtual: this.kmAtual,
            ativo: this.ativo,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    static create(props: {
        placa: string;
        marca: string;
        modelo: string;
        clienteId: string;
        ano?: number;
        cor?: string;
        kmAtual?: number;
    }): Veiculo {
        const placa = Placa.create(props.placa);
        const ano = props.ano !== undefined ? AnoFabricacao.create(props.ano) : undefined;
        return new Veiculo(
            crypto.randomUUID(),
            placa,
            props.marca,
            props.modelo,
            props.clienteId,
            ano,
            props.cor,
            props.kmAtual,
            true,
            new Date(),
            new Date(),
        );
    }

    static restore(props: {
        id: string;
        placa: string;
        marca: string;
        modelo: string;
        clienteId: string;
        ano?: number;
        cor?: string;
        kmAtual?: number;
        ativo: boolean;
        createdAt: Date;
        updatedAt: Date;
    }): Veiculo {
        return new Veiculo(
            props.id,
            Placa.restore(props.placa),
            props.marca,
            props.modelo,
            props.clienteId,
            props.ano !== undefined ? AnoFabricacao.restore(props.ano) : undefined,
            props.cor,
            props.kmAtual,
            props.ativo,
            props.createdAt,
            props.updatedAt,
        );
    }

    update(props: Partial<{ marca: string; modelo: string; ano: number; cor: string; kmAtual: number }>): Veiculo {
        const ano = props.ano !== undefined ? AnoFabricacao.create(props.ano) : this._ano;
        return new Veiculo(
            this.id,
            this._placa,
            props.marca ?? this.marca,
            props.modelo ?? this.modelo,
            this.clienteId,
            ano,
            props.cor ?? this.cor,
            props.kmAtual ?? this.kmAtual,
            this.ativo,
            this.createdAt,
            new Date(),
        );
    }

    deactivate(): Veiculo {
        return new Veiculo(this.id, this._placa, this.marca, this.modelo, this.clienteId, this._ano, this.cor, this.kmAtual, false, this.createdAt, new Date());
    }

    reactivate(): Veiculo {
        return new Veiculo(this.id, this._placa, this.marca, this.modelo, this.clienteId, this._ano, this.cor, this.kmAtual, true, this.createdAt, new Date());
    }
}
