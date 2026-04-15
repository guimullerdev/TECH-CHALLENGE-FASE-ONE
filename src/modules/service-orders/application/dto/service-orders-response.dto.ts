export class ServiceOrderServiceItemResponseDto {
    id: string;
    serviceId: string;
    price: number;
}

export class ServiceOrderPartItemResponseDto {
    id: string;
    partId: string;
    quantity: number;
    price: number;
}

export class ServiceOrderResponseDto {
    id: string;
    customerId: string;
    vehicleId: string;
    status: string;
    description: string;
    totalPrice: number;
    services: ServiceOrderServiceItemResponseDto[];
    parts: ServiceOrderPartItemResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}
