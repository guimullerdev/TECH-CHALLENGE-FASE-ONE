export enum TipoMovimentacao {
    ENTRADA = 'ENTRADA',
    BAIXA = 'BAIXA',
    RESERVA = 'RESERVA',
    LIBERACAO_RESERVA = 'LIBERACAO_RESERVA',
}

export class MovimentacaoEstoque {
    private constructor(
        public readonly id: string,
        public readonly pecaId: string,
        public readonly tipo: TipoMovimentacao,
        public readonly quantidade: number,
        public readonly osId: string | undefined,
        public readonly observacao: string | undefined,
        public readonly createdAt: Date,
    ) {}

    static create(props: {
        pecaId: string;
        tipo: TipoMovimentacao;
        quantidade: number;
        osId?: string;
        observacao?: string;
    }): MovimentacaoEstoque {
        if (props.quantidade <= 0) throw new Error('Quantidade deve ser maior que zero');
        return new MovimentacaoEstoque(
            crypto.randomUUID(),
            props.pecaId,
            props.tipo,
            props.quantidade,
            props.osId,
            props.observacao,
            new Date(),
        );
    }

    static restore(props: {
        id: string;
        pecaId: string;
        tipo: TipoMovimentacao;
        quantidade: number;
        osId?: string;
        observacao?: string;
        createdAt: Date;
    }): MovimentacaoEstoque {
        return new MovimentacaoEstoque(
            props.id,
            props.pecaId,
            props.tipo,
            props.quantidade,
            props.osId,
            props.observacao,
            props.createdAt,
        );
    }
}
