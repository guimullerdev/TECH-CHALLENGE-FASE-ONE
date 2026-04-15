export enum ServiceOrderStatus {
    RECEIVED = 'RECEIVED',
    DIAGNOSING = 'DIAGNOSING',
    WAITING_APPROVAL = 'WAITING_APPROVAL',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED',
    DELIVERED = 'DELIVERED',
}

export interface ServiceOrderServiceItem {
    id: string;
    serviceId: string;
    price: number;
}

export interface ServiceOrderPartItem {
    id: string;
    partId: string;
    quantity: number;
    price: number;
}

export interface ServiceOrderProps {
    id: string;
    customerId: string;
    vehicleId: string;
    status: ServiceOrderStatus;
    description: string;
    totalPrice: number;
    services: ServiceOrderServiceItem[];
    parts: ServiceOrderPartItem[];
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
    get services() { return this.props.services; }
    get parts() { return this.props.parts; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }

    static create(props: {
        customerId: string;
        vehicleId: string;
        description: string;
    }): ServiceOrder {
        if (!props.customerId) throw new Error('customerId é obrigatório');
        if (!props.vehicleId) throw new Error('vehicleId é obrigatório');
        if (!props.description) throw new Error('description é obrigatória');

        return new ServiceOrder({
            id: crypto.randomUUID(),
            customerId: props.customerId,
            vehicleId: props.vehicleId,
            description: props.description,
            status: ServiceOrderStatus.RECEIVED,
            totalPrice: 0,
            services: [],
            parts: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    static restore(props: ServiceOrderProps): ServiceOrder {
        return new ServiceOrder(props);
    }

    update(props: Partial<{ description: string }>): ServiceOrder {
        return new ServiceOrder({
            ...this.props,
            description: props.description ?? this.props.description,
            updatedAt: new Date(),
        });
    }

    addService(item: ServiceOrderServiceItem): ServiceOrder {
        const alreadyAdded = this.props.services.some(s => s.serviceId === item.serviceId);
        if (alreadyAdded) throw new Error('Serviço já adicionado à OS');
        const newServices = [...this.props.services, item];
        return new ServiceOrder({
            ...this.props,
            services: newServices,
            totalPrice: this.recalculateTotalPrice(newServices, this.props.parts),
            updatedAt: new Date(),
        });
    }

    removeService(serviceId: string): ServiceOrder {
        const exists = this.props.services.some(s => s.serviceId === serviceId);
        if (!exists) throw new Error('Serviço não encontrado na OS');
        const newServices = this.props.services.filter(s => s.serviceId !== serviceId);
        return new ServiceOrder({
            ...this.props,
            services: newServices,
            totalPrice: this.recalculateTotalPrice(newServices, this.props.parts),
            updatedAt: new Date(),
        });
    }

    addPart(item: ServiceOrderPartItem): ServiceOrder {
        if (item.quantity < 1) throw new Error('Quantidade deve ser >= 1');
        const alreadyAdded = this.props.parts.some(p => p.partId === item.partId);
        if (alreadyAdded) throw new Error('Peça já adicionada à OS');
        const newParts = [...this.props.parts, item];
        return new ServiceOrder({
            ...this.props,
            parts: newParts,
            totalPrice: this.recalculateTotalPrice(this.props.services, newParts),
            updatedAt: new Date(),
        });
    }

    removePart(partId: string): ServiceOrder {
        const exists = this.props.parts.some(p => p.partId === partId);
        if (!exists) throw new Error('Peça não encontrada na OS');
        const newParts = this.props.parts.filter(p => p.partId !== partId);
        return new ServiceOrder({
            ...this.props,
            parts: newParts,
            totalPrice: this.recalculateTotalPrice(this.props.services, newParts),
            updatedAt: new Date(),
        });
    }

    recalculateTotalPrice(
        services: ServiceOrderServiceItem[],
        parts: ServiceOrderPartItem[],
    ): number {
        const servicesTotal = services.reduce((sum, s) => sum + s.price, 0);
        const partsTotal = parts.reduce((sum, p) => sum + p.price * p.quantity, 0);
        return servicesTotal + partsTotal;
    }
}
