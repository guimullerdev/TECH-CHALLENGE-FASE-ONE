import { Test, TestingModule } from '@nestjs/testing';
import { RelatoriosController } from './relatorios.controller';
import { TempoMedioServicosUseCase } from '../application/use-cases/tempo-medio-servicos.usecase';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

describe('RelatoriosController', () => {
    let controller: RelatoriosController;
    let tempoMedioUC: { execute: jest.Mock };

    beforeEach(async () => {
        tempoMedioUC = { execute: jest.fn().mockResolvedValue([]) };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [RelatoriosController],
            providers: [{ provide: TempoMedioServicosUseCase, useValue: tempoMedioUC }],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<RelatoriosController>(RelatoriosController);
    });

    it('getTempoMedioServicos delegates to TempoMedioServicosUseCase', async () => {
        const result = await controller.getTempoMedioServicos();
        expect(tempoMedioUC.execute).toHaveBeenCalled();
        expect(result).toEqual([]);
    });
});
