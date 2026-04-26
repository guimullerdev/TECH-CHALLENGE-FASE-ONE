export class Telefone {
    private constructor(private readonly value: string) {}

    static create(raw: string): Telefone {
        const digits = raw.replace(/\D/g, '');
        if (digits.length < 10 || digits.length > 11) {
            throw new Error('Telefone deve ter 10 ou 11 dígitos (com DDD)');
        }
        return new Telefone(digits);
    }

    static restore(raw: string): Telefone {
        return new Telefone(raw.replace(/\D/g, ''));
    }

    getValue(): string { return this.value; }

    equals(other: Telefone): boolean { return this.value === other.value; }
}
