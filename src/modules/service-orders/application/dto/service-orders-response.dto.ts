import { ApiProperty } from '@nestjs/swagger';

export class ServiceOrderServiceItemResponseDto {
    @ApiProperty({ example: 'e7f8a9b0-5678-9012-def0-123456789012' })
    id: string;

    @ApiProperty({ example: 'd6e7f8a9-4567-8901-cdef-012345678901' })
    serviceId: string;

    @ApiProperty({ example: 150.00, description: 'Preço do serviço em reais' })
    price: number;
}

export class ServiceOrderPartItemResponseDto {
    @ApiProperty({ example: 'f8a9b0c1-6789-0123-ef01-234567890123' })
    id: string;

    @ApiProperty({ example: 'c5d6e7f8-3456-7890-bcde-f01234567890' })
    partId: string;

    @ApiProperty({ example: 2, description: 'Quantidade de peças' })
    quantity: number;

    @ApiProperty({ example: 45.90, description: 'Preço unitário da peça em reais' })
    price: number;
}

export class ServiceOrderResponseDto {
    @ApiProperty({ example: 'a1b2c3d4-1234-5678-90ab-cdef01234567' })
    id: string;

    @ApiProperty({ example: 'a3e4f5b6-1234-5678-9abc-def012345678' })
    customerId: string;

    @ApiProperty({ example: 'b4f5a6c7-2345-6789-abcd-ef0123456789' })
    vehicleId: string;

    @ApiProperty({ example: 'RECEIVED', enum: ['RECEIVED', 'DIAGNOSING', 'WAITING_APPROVAL', 'IN_PROGRESS', 'FINISHED', 'DELIVERED'] })
    status: string;

    @ApiProperty({ example: 'Veículo apresenta barulho ao frear e luz do motor acesa' })
    description: string;

    @ApiProperty({ example: 195.90, description: 'Valor total da OS em reais' })
    totalPrice: number;

    @ApiProperty({ type: [ServiceOrderServiceItemResponseDto] })
    services: ServiceOrderServiceItemResponseDto[];

    @ApiProperty({ type: [ServiceOrderPartItemResponseDto] })
    parts: ServiceOrderPartItemResponseDto[];

    @ApiProperty({ example: '2026-04-16T10:00:00.000Z' })
    createdAt: Date;

    @ApiProperty({ example: '2026-04-16T12:00:00.000Z' })
    updatedAt: Date;
}
