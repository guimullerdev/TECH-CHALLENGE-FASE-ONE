export class ItemOrcamentoServico {
    private constructor(
        public readonly id: string,
        public readonly servicoId: string,
        public readonly valor: number,
    ) {}

    static create(props: { servicoId: string; valor: number }): ItemOrcamentoServico {
        if (!props.servicoId) throw new Error('servicoId é obrigatório');
        if (props.valor < 0) throw new Error('Valor do item não pode ser negativo');
        return new ItemOrcamentoServico(crypto.randomUUID(), props.servicoId, props.valor);
    }

    static restore(props: { id: string; servicoId: string; valor: number }): ItemOrcamentoServico {
        return new ItemOrcamentoServico(props.id, props.servicoId, props.valor);
    }
}
