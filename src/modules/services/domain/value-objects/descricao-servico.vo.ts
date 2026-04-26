export class DescricaoServico {
    private static readonly MIN = 3;
    private static readonly MAX = 500;

    private constructor(private readonly value: string) {}

    static create(raw: string): DescricaoServico {
        const trimmed = raw.trim();
        if (trimmed.length < DescricaoServico.MIN) {
            throw new Error(`Descrição do serviço deve ter ao menos ${DescricaoServico.MIN} caracteres`);
        }
        if (trimmed.length > DescricaoServico.MAX) {
            throw new Error(`Descrição do serviço não pode exceder ${DescricaoServico.MAX} caracteres`);
        }
        return new DescricaoServico(trimmed);
    }

    static restore(raw: string): DescricaoServico {
        return new DescricaoServico(raw);
    }

    getValue(): string { return this.value; }

    equals(other: DescricaoServico): boolean { return this.value === other.value; }
}
