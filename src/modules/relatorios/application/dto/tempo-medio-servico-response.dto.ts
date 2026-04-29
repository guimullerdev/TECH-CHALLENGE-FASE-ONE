import { ApiProperty } from '@nestjs/swagger';

export class TempoMedioServicoDto {
    @ApiProperty() servicoId: string;
    @ApiProperty() servicoNome: string;
    @ApiProperty() qtdExecucoes: number;
    @ApiProperty() tempoMedioMinutos: number;
    @ApiProperty() tempoMinMinutos: number;
    @ApiProperty() tempoMaxMinutos: number;
}
