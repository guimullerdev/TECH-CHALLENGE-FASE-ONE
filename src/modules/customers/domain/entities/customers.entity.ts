export class Customer {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly createdAt: Date,
        public readonly document: string,
        public readonly phone: string,
    ) { }

    static create(props: { name: string; email: string; document: string; phone: string }): Customer {
        if (!props.email.includes('@')) throw new Error('Email inválido');

        return new Customer(
            crypto.randomUUID(),
            props.name,
            props.email,
            new Date(),
            props.document,
            props.phone,
        );
    }

    static restore(props: {
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        document: string;
        phone: string;
    }): Customer {
        return new Customer(props.id, props.name, props.email, props.createdAt, props.document, props.phone);
    }

    update(props: Partial<{ name: string; email: string; document: string; phone: string }>): Customer {
        if (props.email && !props.email.includes('@')) throw new Error('Email inválido');
        return new Customer(
            this.id,
            props.name ?? this.name,
            props.email ?? this.email,
            this.createdAt,
            props.document ?? this.document,
            props.phone ?? this.phone,
        );
    }
}