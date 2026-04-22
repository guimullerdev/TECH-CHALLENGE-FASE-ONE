import { Test, TestingModule } from '@nestjs/testing';
import { OrcamentosController } from './orcamentos.controller';
import { GetOrcamentoUseCase } from '../application/use-cases/get-orcamento.usecase';
import { EnviarOrcamentoUseCase } from '../application/use-cases/enviar-orcamento.usecase';
import { AprovarOrcamentoUseCase } from '../application/use-cases/aprovar-orcamento.usecase';
import { ReprovarOrcamentoUseCase } from '../application/use-cases/reprovar-orcamento.usecase';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

const uc = () => ({ execute: jest.fn().mockResolvedValue({ id: 'orc-1' }), executeByOsId: jest.fn().mockResolvedValue({ id: 'orc-1' }) });

describe('OrcamentosController', () => {
    let controller: OrcamentosController;
    let getUC: { execute: jest.Mock; executeByOsId: jest.Mock };
    let enviarUC: { execute: jest.Mock };
    let aprovarUC: { execute: jest.Mock };
    let reprovarUC: { execute: jest.Mock };

    beforeEach(async () => {
        getUC = { execute: jest.fn().mockResolvedValue({ id: 'orc-1' }), executeByOsId: jest.fn().mockResolvedValue({ id: 'orc-1' }) };
        enviarUC = { execute: jest.fn().mockResolvedValue({ id: 'orc-1' }) };
        aprovarUC = { execute: jest.fn().mockResolvedValue({ id: 'orc-1' }) };
        reprovarUC = { execute: jest.fn().mockResolvedValue({ id: 'orc-1' }) };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrcamentosController],
            providers: [
                { provide: GetOrcamentoUseCase, useValue: getUC },
                { provide: EnviarOrcamentoUseCase, useValue: enviarUC },
                { provide: AprovarOrcamentoUseCase, useValue: aprovarUC },
                { provide: ReprovarOrcamentoUseCase, useValue: reprovarUC },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<OrcamentosController>(OrcamentosController);
    });

    it('findByOsId delegates to GetOrcamentoUseCase.executeByOsId', async () => {
        await controller.findByOsId('os-1');
        expect(getUC.executeByOsId).toHaveBeenCalledWith('os-1');
    });

    it('findOne delegates to GetOrcamentoUseCase.execute', async () => {
        await controller.findOne('orc-1');
        expect(getUC.execute).toHaveBeenCalledWith('orc-1');
    });

    it('enviar delegates to EnviarOrcamentoUseCase', async () => {
        await controller.enviar('orc-1');
        expect(enviarUC.execute).toHaveBeenCalledWith('orc-1');
    });

    it('aprovar delegates to AprovarOrcamentoUseCase', async () => {
        await controller.aprovar('orc-1');
        expect(aprovarUC.execute).toHaveBeenCalledWith('orc-1');
    });

    it('reprovar delegates to ReprovarOrcamentoUseCase with observacoes', async () => {
        await controller.reprovar('orc-1', { observacoes: 'Caro demais' });
        expect(reprovarUC.execute).toHaveBeenCalledWith('orc-1', 'Caro demais');
    });
});
