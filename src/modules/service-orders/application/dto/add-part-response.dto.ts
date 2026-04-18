import { ApiProperty } from '@nestjs/swagger';

import { ServiceOrderResponseDto } from './service-orders-response.dto';

export class AddPartResponseDto {
    @ApiProperty({ type: () => ServiceOrderResponseDto })
    order: ServiceOrderResponseDto;

    @ApiProperty({ example: true, description: 'Indica se há estoque suficiente para a quantidade solicitada' })
    stockAvailable: boolean;

    @ApiProperty({ example: 20, description: 'Quantidade atual em estoque' })
    stockQty: number;
}
