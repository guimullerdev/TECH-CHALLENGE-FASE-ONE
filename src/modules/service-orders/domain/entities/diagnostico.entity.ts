export class Diagnostico {
    private constructor(
        public readonly id: string,
        public readonly descricao: string,
        public readonly data: Date,
        public readonly mecanicoResponsavel: string,
    ) {}

    static create(props: {
        descricao: string;
        mecanicoResponsavel: string;
    }): Diagnostico {
        if (!props.descricao.trim()) throw new Error('Descrição do diagnóstico é obrigatória');
        if (!props.mecanicoResponsavel.trim()) throw new Error('Mecânico responsável é obrigatório');
        return new Diagnostico(crypto.randomUUID(), props.descricao.trim(), new Date(), props.mecanicoResponsavel.trim());
    }

    static restore(props: {
        id: string;
        descricao: string;
        data: Date;
        mecanicoResponsavel: string;
    }): Diagnostico {
        return new Diagnostico(props.id, props.descricao, props.data, props.mecanicoResponsavel);
    }
}
