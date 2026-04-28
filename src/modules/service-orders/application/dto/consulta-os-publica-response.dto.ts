import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class VeiculoPublicoDto {
    @ApiProperty() placa: string;
    @ApiProperty() marca: string;
    @ApiProperty() modelo: string;
}

class OrcamentoPublicoDto {
    @ApiProperty() valorTotal: number;
    @ApiProperty() status: string;
}

export class ConsultaOsPublicaResponseDto {
    @ApiProperty() numero: string;
    @ApiProperty() status: string;
    @ApiProperty() dataAbertura: Date;
    @ApiProperty() veiculo: VeiculoPublicoDto;
    @ApiPropertyOptional() orcamento?: OrcamentoPublicoDto;
}
