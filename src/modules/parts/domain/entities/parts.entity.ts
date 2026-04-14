export class Part {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly price: number,
        public readonly stockQty: number,
        public readonly description?: string,
    ) { }

    static create(props: {
        name: string;
        price: number;
        stockQty: number;
        description?: string;
    }): Part {
        if (props.price < 0) throw new Error('Preço não pode ser negativo');
        if (props.stockQty < 0) throw new Error('Quantidade em estoque não pode ser negativa');
        return new Part(
            crypto.randomUUID(),
            props.name,
            props.price,
            props.stockQty,
            props.description,
        );
    }

    static restore(props: {
        id: string;
        name: string;
        price: number;
        stockQty: number;
        description?: string;
    }): Part {
        return new Part(props.id, props.name, props.price, props.stockQty, props.description);
    }

    update(props: Partial<{ name: string; price: number; stockQty: number; description: string }>): Part {
        if (props.price !== undefined && props.price < 0) throw new Error('Preço não pode ser negativo');
        if (props.stockQty !== undefined && props.stockQty < 0) throw new Error('Quantidade em estoque não pode ser negativa');
        return new Part(
            this.id,
            props.name ?? this.name,
            props.price ?? this.price,
            props.stockQty ?? this.stockQty,
            props.description ?? this.description,
        );
    }
}
