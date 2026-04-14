export class Services {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly price: number,
        public readonly estimatedTime: number,
        public readonly description?: string,
    ) { }

    static create(props: {
        name: string;
        price: number;
        estimatedTime: number;
        description?: string;
    }): Services {
        if (props.price < 0) throw new Error('Preço não pode ser negativo');
        if (props.estimatedTime < 1) throw new Error('Tempo estimado deve ser ao menos 1 minuto');
        return new Services(
            crypto.randomUUID(),
            props.name,
            props.price,
            props.estimatedTime,
            props.description,
        );
    }

    static restore(props: {
        id: string;
        name: string;
        price: number;
        estimatedTime: number;
        description?: string;
    }): Services {
        return new Services(props.id, props.name, props.price, props.estimatedTime, props.description);
    }

    update(props: Partial<{ name: string; price: number; estimatedTime: number; description: string }>): Services {
        if (props.price !== undefined && props.price < 0) throw new Error('Preço não pode ser negativo');
        if (props.estimatedTime !== undefined && props.estimatedTime < 1) throw new Error('Tempo estimado deve ser ao menos 1 minuto');
        return new Services(
            this.id,
            props.name ?? this.name,
            props.price ?? this.price,
            props.estimatedTime ?? this.estimatedTime,
            props.description ?? this.description,
        );
    }
}
