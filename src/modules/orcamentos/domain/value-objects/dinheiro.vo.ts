export class Dinheiro {
    private constructor(private readonly value: number) {}

    static create(valor: number): Dinheiro {
        if (valor < 0) throw new Error('Valor monetário não pode ser negativo');
        if (!isFinite(valor)) throw new Error('Valor monetário deve ser um número finito');
        return new Dinheiro(Math.round(valor * 100) / 100);
    }

    static restore(valor: number): Dinheiro {
        return new Dinheiro(valor);
    }

    getValue(): number { return this.value; }

    add(other: Dinheiro): Dinheiro { return new Dinheiro(Math.round((this.value + other.value) * 100) / 100); }

    equals(other: Dinheiro): boolean { return this.value === other.value; }

    isZero(): boolean { return this.value === 0; }
}
