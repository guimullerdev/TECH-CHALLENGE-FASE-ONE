export class Quantidade {
    private constructor(private readonly value: number) {}

    static create(valor: number): Quantidade {
        if (!Number.isInteger(valor)) throw new Error('Quantidade deve ser um número inteiro');
        if (valor < 0) throw new Error('Quantidade não pode ser negativa');
        return new Quantidade(valor);
    }

    static createPositivo(valor: number): Quantidade {
        if (!Number.isInteger(valor) || valor < 1) throw new Error('Quantidade deve ser inteiro >= 1');
        return new Quantidade(valor);
    }

    static restore(valor: number): Quantidade {
        return new Quantidade(valor);
    }

    getValue(): number { return this.value; }

    subtract(other: Quantidade): Quantidade {
        const result = this.value - other.value;
        if (result < 0) throw new Error('Operação resultaria em quantidade negativa');
        return new Quantidade(result);
    }

    add(other: Quantidade): Quantidade {
        return new Quantidade(this.value + other.value);
    }

    isEnough(needed: Quantidade): boolean { return this.value >= needed.value; }

    equals(other: Quantidade): boolean { return this.value === other.value; }
}
