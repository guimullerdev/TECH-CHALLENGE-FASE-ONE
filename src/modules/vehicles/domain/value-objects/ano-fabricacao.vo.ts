export class AnoFabricacao {
    private static readonly ANO_MIN = 1886;

    private constructor(private readonly value: number) {}

    static create(ano: number): AnoFabricacao {
        const anoMax = new Date().getFullYear() + 1;
        if (!Number.isInteger(ano) || ano < AnoFabricacao.ANO_MIN || ano > anoMax) {
            throw new Error(`Ano de fabricação inválido: ${ano}. Deve estar entre ${AnoFabricacao.ANO_MIN} e ${anoMax}`);
        }
        return new AnoFabricacao(ano);
    }

    static restore(ano: number): AnoFabricacao {
        return new AnoFabricacao(ano);
    }

    getValue(): number { return this.value; }

    equals(other: AnoFabricacao): boolean { return this.value === other.value; }
}
