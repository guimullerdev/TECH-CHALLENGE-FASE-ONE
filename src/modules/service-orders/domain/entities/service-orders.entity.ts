export enum ServiceOrderStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export interface ServiceOrderProps {
    id: string;
    customerId: string;
    vehicleId: string;
    status: ServiceOrderStatus;
    description: string;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

export class ServiceOrder {
    private constructor(private readonly props: ServiceOrderProps) { }


    get id() { return this.props.id; }
    get customerId() { return this.props.customerId; }
    get vehicleId() { return this.props.vehicleId; }
    get status() { return this.props.status; }
    get description() { return this.props.description; }
    get totalPrice() { return this.props.totalPrice; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }


    static create(props: {
        customerId: string;
        vehicleId: string;
        description: string;
    }): ServiceOrder {
        if (!props.customerId) throw new Error('customerId is required');
        if (!props.vehicleId) throw new Error('vehicleId is required');
        if (!props.description) throw new Error('description is required');

        return new ServiceOrder({
            id: crypto.randomUUID(),
            customerId: props.customerId,
            vehicleId: props.vehicleId,
            description: props.description,
            status: ServiceOrderStatus.PENDING,
            totalPrice: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    static restore(props: ServiceOrderProps): ServiceOrder {
        return new ServiceOrder(props);
    }
}