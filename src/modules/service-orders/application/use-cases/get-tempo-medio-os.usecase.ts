import { Inject, Injectable } from '@nestjs/common';

import { ORDEM_DE_SERVICO_REPOSITORY, IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import { StatusOS } from '../../domain/entities/service-orders.entity';

export interface TempoMedioOsResponse {
    totalOsConsideradas: number;
    tempoMedioEmHoras: number;
    tempoMedioEmMinutos: number;
    filtros: {
        dataInicio?: string;
        dataFim?: string;
    };
}

@Injectable()
export class GetTempoMedioOsUseCase {
    constructor(
        @Inject(ORDEM_DE_SERVICO_REPOSITORY)
        private readonly repo: IOrdemDeServicoRepository,
    ) {}

    async execute(filtros?: { dataInicio?: Date; dataFim?: Date }): Promise<TempoMedioOsResponse> {
        const [concluidas, entregues] = await Promise.all([
            this.repo.findAll({ status: StatusOS.FINALIZADA }),
            this.repo.findAll({ status: StatusOS.ENTREGUE }),
        ]);

        const finalizadas = [...concluidas, ...entregues].filter(os => {
            if (!os.dataFechamento) return false;
            if (filtros?.dataInicio && os.dataFechamento < filtros.dataInicio) return false;
            if (filtros?.dataFim && os.dataFechamento > filtros.dataFim) return false;
            return true;
        });

        if (finalizadas.length === 0) {
            return {
                totalOsConsideradas: 0,
                tempoMedioEmHoras: 0,
                tempoMedioEmMinutos: 0,
                filtros: {
                    dataInicio: filtros?.dataInicio?.toISOString(),
                    dataFim: filtros?.dataFim?.toISOString(),
                },
            };
        }

        const somaMs = finalizadas.reduce((acc, os) => {
            return acc + (os.dataFechamento!.getTime() - os.dataAbertura.getTime());
        }, 0);

        const mediaMs = somaMs / finalizadas.length;
        const mediaHoras = mediaMs / 3600000;
        const mediaMinutos = mediaMs / 60000;

        return {
            totalOsConsideradas: finalizadas.length,
            tempoMedioEmHoras: Math.round(mediaHoras * 100) / 100,
            tempoMedioEmMinutos: Math.round(mediaMinutos),
            filtros: {
                dataInicio: filtros?.dataInicio?.toISOString(),
                dataFim: filtros?.dataFim?.toISOString(),
            },
        };
    }
}
