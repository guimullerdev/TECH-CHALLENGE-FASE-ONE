export class ItemOrcamentoPeca {
    private constructor(
        public readonly id: string,
        public readonly pecaId: string,
        public readonly quantidade: number,
        public readonly valorUnitario: number,
    ) {}

    get valorTotal(): number {
        return Math.round(this.quantidade * this.valorUnitario * 100) / 100;
    }

    static create(props: { pecaId: string; quantidade: number; valorUnitario: number }): ItemOrcamentoPeca {
        if (!props.pecaId) throw new Error('pecaId é obrigatório');
        if (props.quantidade < 1) throw new Error('Quantidade deve ser >= 1');
        if (props.valorUnitario < 0) throw new Error('Valor unitário não pode ser negativo');
        return new ItemOrcamentoPeca(crypto.randomUUID(), props.pecaId, props.quantidade, props.valorUnitario);
    }

    static restore(props: { id: string; pecaId: string; quantidade: number; valorUnitario: number }): ItemOrcamentoPeca {
        return new ItemOrcamentoPeca(props.id, props.pecaId, props.quantidade, props.valorUnitario);
    }
}
