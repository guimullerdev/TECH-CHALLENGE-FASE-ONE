export class Vehicle {
    private constructor(
        public readonly id: string,
        public readonly plate: string,
        public readonly brand: string,
        public readonly model: string,
        public readonly year: number,
        public readonly customerId: string,
    ) { }

    static create(props: {
        plate: string;
        brand: string;
        model: string;
        year: number;
        customerId: string;
    }): Vehicle {
        if (props.year < 1886 || props.year > new Date().getFullYear() + 1) {
            throw new Error('Ano do veículo inválido');
        }
        return new Vehicle(
            crypto.randomUUID(),
            props.plate.toUpperCase(),
            props.brand,
            props.model,
            props.year,
            props.customerId,
        );
    }

    static restore(props: {
        id: string;
        plate: string;
        brand: string;
        model: string;
        year: number;
        customerId: string;
    }): Vehicle {
        return new Vehicle(props.id, props.plate, props.brand, props.model, props.year, props.customerId);
    }

    update(props: Partial<{ brand: string; model: string; year: number }>): Vehicle {
        if (props.year !== undefined && (props.year < 1886 || props.year > new Date().getFullYear() + 1)) {
            throw new Error('Ano do veículo inválido');
        }
        return new Vehicle(
            this.id,
            this.plate,
            props.brand ?? this.brand,
            props.model ?? this.model,
            props.year ?? this.year,
            this.customerId,
        );
    }
}
