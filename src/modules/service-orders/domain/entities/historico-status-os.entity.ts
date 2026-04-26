import { StatusOS } from './service-orders.entity';

export class HistoricoStatusOS {
    private constructor(
        public readonly id: string,
        public readonly statusAnterior: StatusOS | null,
        public readonly statusNovo: StatusOS,
        public readonly data: Date,
    ) {}

    static create(props: {
        statusAnterior: StatusOS | null;
        statusNovo: StatusOS;
    }): HistoricoStatusOS {
        return new HistoricoStatusOS(crypto.randomUUID(), props.statusAnterior, props.statusNovo, new Date());
    }

    static restore(props: {
        id: string;
        statusAnterior: StatusOS | null;
        statusNovo: StatusOS;
        data: Date;
    }): HistoricoStatusOS {
        return new HistoricoStatusOS(props.id, props.statusAnterior, props.statusNovo, props.data);
    }
}
