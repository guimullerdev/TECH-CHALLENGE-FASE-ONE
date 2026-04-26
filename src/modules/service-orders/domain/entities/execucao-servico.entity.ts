import { TempoExecucao } from '../value-objects/tempo-execucao.vo';

export class ExecucaoServico {
    private readonly _tempo: TempoExecucao;

    private constructor(
        public readonly id: string,
        tempo: TempoExecucao,
        public readonly mecanicoResponsavel: string,
    ) {
        this._tempo = tempo;
    }

    get dataInicio(): Date { return this._tempo.getInicio(); }

    get dataFim(): Date { return this._tempo.getFim(); }

    get duracaoEmMinutos(): number { return this._tempo.getDuracaoEmMinutos(); }

    static create(props: {
        dataInicio: Date;
        dataFim: Date;
        mecanicoResponsavel: string;
    }): ExecucaoServico {
        if (!props.mecanicoResponsavel.trim()) throw new Error('Mecânico responsável é obrigatório');
        const tempo = TempoExecucao.create(props.dataInicio, props.dataFim);
        return new ExecucaoServico(crypto.randomUUID(), tempo, props.mecanicoResponsavel.trim());
    }

    static restore(props: {
        id: string;
        dataInicio: Date;
        dataFim: Date;
        mecanicoResponsavel: string;
    }): ExecucaoServico {
        const tempo = TempoExecucao.restore(props.dataInicio, props.dataFim);
        return new ExecucaoServico(props.id, tempo, props.mecanicoResponsavel);
    }
}
