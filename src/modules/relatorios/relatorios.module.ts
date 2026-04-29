import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { RelatoriosController } from './presentation/relatorios.controller';
import { TempoMedioServicosUseCase } from './application/use-cases/tempo-medio-servicos.usecase';

@Module({
    imports: [PrismaModule],
    controllers: [RelatoriosController],
    providers: [TempoMedioServicosUseCase],
})
export class RelatoriosModule {}
