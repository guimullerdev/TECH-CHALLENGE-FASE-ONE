export enum StatusOrcamento {
    GERADO = 'GERADO',
    ENVIADO = 'ENVIADO',
    APROVADO = 'APROVADO',
    REPROVADO = 'REPROVADO',
}

export class OrcamentoTransitionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'OrcamentoTransitionError';
    }
}

export class Orcamento {
    private constructor(
        public readonly id: string,
        public readonly osId: string,
        public readonly status: StatusOrcamento,
        public readonly valorTotal: number,
        public readonly dataGeracao: Date,
        public readonly dataEnvio: Date | undefined,
        public readonly dataResposta: Date | undefined,
        public readonly observacoes: string | undefined,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    static create(props: {
        osId: string;
        valorTotal: number;
        observacoes?: string;
    }): Orcamento {
        if (props.valorTotal < 0) throw new Error('Valor total não pode ser negativo');
        return new Orcamento(
            crypto.randomUUID(),
            props.osId,
            StatusOrcamento.GERADO,
            props.valorTotal,
            new Date(),
            undefined,
            undefined,
            props.observacoes,
            new Date(),
            new Date(),
        );
    }

    static restore(props: {
        id: string;
        osId: string;
        status: StatusOrcamento;
        valorTotal: number;
        dataGeracao: Date;
        dataEnvio?: Date;
        dataResposta?: Date;
        observacoes?: string;
        createdAt: Date;
        updatedAt: Date;
    }): Orcamento {
        return new Orcamento(
            props.id,
            props.osId,
            props.status,
            props.valorTotal,
            props.dataGeracao,
            props.dataEnvio,
            props.dataResposta,
            props.observacoes,
            props.createdAt,
            props.updatedAt,
        );
    }

    enviar(): Orcamento {
        if (this.status !== StatusOrcamento.GERADO) {
            throw new OrcamentoTransitionError(
                `Transição inválida: ${this.status} → ENVIADO. Status esperado: GERADO`,
            );
        }
        return new Orcamento(
            this.id, this.osId, StatusOrcamento.ENVIADO, this.valorTotal,
            this.dataGeracao, new Date(), this.dataResposta, this.observacoes,
            this.createdAt, new Date(),
        );
    }

    aprovar(observacoes?: string): Orcamento {
        if (this.status !== StatusOrcamento.GERADO && this.status !== StatusOrcamento.ENVIADO) {
            throw new OrcamentoTransitionError(
                `Transição inválida: ${this.status} → APROVADO. Status esperado: GERADO ou ENVIADO`,
            );
        }
        return new Orcamento(
            this.id, this.osId, StatusOrcamento.APROVADO, this.valorTotal,
            this.dataGeracao, this.dataEnvio, new Date(), observacoes ?? this.observacoes,
            this.createdAt, new Date(),
        );
    }

    reprovar(observacoes?: string): Orcamento {
        if (this.status !== StatusOrcamento.GERADO && this.status !== StatusOrcamento.ENVIADO) {
            throw new OrcamentoTransitionError(
                `Transição inválida: ${this.status} → REPROVADO. Status esperado: GERADO ou ENVIADO`,
            );
        }
        return new Orcamento(
            this.id, this.osId, StatusOrcamento.REPROVADO, this.valorTotal,
            this.dataGeracao, this.dataEnvio, new Date(), observacoes ?? this.observacoes,
            this.createdAt, new Date(),
        );
    }
}
