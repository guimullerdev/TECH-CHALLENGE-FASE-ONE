export class DescricaoPeca {
    private static readonly MIN = 3;
    private static readonly MAX = 500;

    private constructor(private readonly value: string) {}

    static create(raw: string): DescricaoPeca {
        const trimmed = raw.trim();
        if (trimmed.length < DescricaoPeca.MIN) {
            throw new Error(`Descrição da peça deve ter ao menos ${DescricaoPeca.MIN} caracteres`);
        }
        if (trimmed.length > DescricaoPeca.MAX) {
            throw new Error(`Descrição da peça não pode exceder ${DescricaoPeca.MAX} caracteres`);
        }
        return new DescricaoPeca(trimmed);
    }

    static restore(raw: string): DescricaoPeca {
        return new DescricaoPeca(raw);
    }

    getValue(): string { return this.value; }

    equals(other: DescricaoPeca): boolean { return this.value === other.value; }
}
