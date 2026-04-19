export class Veiculo {
    private constructor(
        public readonly id: string,
        public readonly placa: string,
        public readonly marca: string,
        public readonly modelo: string,
        public readonly clienteId: string,
        public readonly ano: number | undefined,
        public readonly cor: string | undefined,
        public readonly kmAtual: number | undefined,
        public readonly ativo: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    static create(props: {
        placa: string;
        marca: string;
        modelo: string;
        clienteId: string;
        ano?: number;
        cor?: string;
        kmAtual?: number;
    }): Veiculo {
        if (props.ano !== undefined && (props.ano < 1886 || props.ano > new Date().getFullYear() + 1)) {
            throw new Error('Ano do veículo inválido');
        }
        return new Veiculo(
            crypto.randomUUID(),
            props.placa.toUpperCase(),
            props.marca,
            props.modelo,
            props.clienteId,
            props.ano,
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
            props.placa,
            props.marca,
            props.modelo,
            props.clienteId,
            props.ano,
            props.cor,
            props.kmAtual,
            props.ativo,
            props.createdAt,
            props.updatedAt,
        );
    }

    update(props: Partial<{ marca: string; modelo: string; ano: number; cor: string; kmAtual: number }>): Veiculo {
        if (props.ano !== undefined && (props.ano < 1886 || props.ano > new Date().getFullYear() + 1)) {
            throw new Error('Ano do veículo inválido');
        }
        return new Veiculo(
            this.id,
            this.placa,
            props.marca ?? this.marca,
            props.modelo ?? this.modelo,
            this.clienteId,
            props.ano ?? this.ano,
            props.cor ?? this.cor,
            props.kmAtual ?? this.kmAtual,
            this.ativo,
            this.createdAt,
            new Date(),
        );
    }

    deactivate(): Veiculo {
        return new Veiculo(this.id, this.placa, this.marca, this.modelo, this.clienteId, this.ano, this.cor, this.kmAtual, false, this.createdAt, new Date());
    }

    reactivate(): Veiculo {
        return new Veiculo(this.id, this.placa, this.marca, this.modelo, this.clienteId, this.ano, this.cor, this.kmAtual, true, this.createdAt, new Date());
    }
}
