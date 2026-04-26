export class TempoExecucao {
    private constructor(
        private readonly inicio: Date,
        private readonly fim: Date,
    ) {}

    static create(inicio: Date, fim: Date): TempoExecucao {
        if (!(inicio instanceof Date) || isNaN(inicio.getTime())) throw new Error('Data de início inválida');
        if (!(fim instanceof Date) || isNaN(fim.getTime())) throw new Error('Data de fim inválida');
        if (fim <= inicio) throw new Error('Data de fim deve ser posterior à data de início');
        return new TempoExecucao(inicio, fim);
    }

    static restore(inicio: Date, fim: Date): TempoExecucao {
        return new TempoExecucao(inicio, fim);
    }

    getInicio(): Date { return this.inicio; }

    getFim(): Date { return this.fim; }

    getDuracaoEmMinutos(): number {
        return Math.round((this.fim.getTime() - this.inicio.getTime()) / 60000);
    }

    getDuracaoEmHoras(): number {
        return (this.fim.getTime() - this.inicio.getTime()) / 3600000;
    }

    equals(other: TempoExecucao): boolean {
        return this.inicio.getTime() === other.inicio.getTime() && this.fim.getTime() === other.fim.getTime();
    }
}
