import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { EstoqueModule } from '../estoque/estoque.module';
import { ORCAMENTO_REPOSITORY } from './domain/repositories/orcamento.repository.interface';
import { ORDEM_DE_SERVICO_REPOSITORY } from '../service-orders/domain/repositories/service-orders.repository.interface';
import { OrcamentoPrismaRepository } from './infrastructure/repositories/orcamento-prisma.repository';
import { OrdemDeServicoPrismaRepository } from '../service-orders/infrastructure/repositories/service-orders-prisma.repository';
import { OrcamentosController } from './presentation/orcamentos.controller';
import { GetOrcamentoUseCase } from './application/use-cases/get-orcamento.usecase';
import { GerarOrcamentoUseCase } from './application/use-cases/gerar-orcamento.usecase';
import { EnviarOrcamentoUseCase } from './application/use-cases/enviar-orcamento.usecase';
import { AprovarOrcamentoUseCase } from './application/use-cases/aprovar-orcamento.usecase';
import { ReprovarOrcamentoUseCase } from './application/use-cases/reprovar-orcamento.usecase';
import { OsStatusMetrics } from '../service-orders/application/os-status-metrics.service';

@Module({
    imports: [PrismaModule, EstoqueModule],
    controllers: [OrcamentosController],
    providers: [
        GetOrcamentoUseCase,
        GerarOrcamentoUseCase,
        EnviarOrcamentoUseCase,
        AprovarOrcamentoUseCase,
        ReprovarOrcamentoUseCase,
        // Aprovar/reprovar move a OS, e essa transição não passa pelo
        // controller de ordens de serviço — então a métrica sai daqui.
        OsStatusMetrics,
        {
            provide: ORCAMENTO_REPOSITORY,
            useClass: OrcamentoPrismaRepository,
        },
        {
            provide: ORDEM_DE_SERVICO_REPOSITORY,
            useClass: OrdemDeServicoPrismaRepository,
        },
    ],
    exports: [ORCAMENTO_REPOSITORY, GerarOrcamentoUseCase],
})
export class OrcamentosModule {}
