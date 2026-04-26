export class Preco {
    private constructor(private readonly value: number) {}

    static create(valor: number): Preco {
        if (valor < 0) throw new Error('Preço não pode ser negativo');
        if (!isFinite(valor)) throw new Error('Preço deve ser um número finito');
        return new Preco(Math.round(valor * 100) / 100);
    }

    static restore(valor: number): Preco {
        return new Preco(valor);
    }

    getValue(): number { return this.value; }

    add(other: Preco): Preco { return new Preco(Math.round((this.value + other.value) * 100) / 100); }

    multiply(factor: number): Preco { return new Preco(Math.round(this.value * factor * 100) / 100); }

    equals(other: Preco): boolean { return this.value === other.value; }
}
