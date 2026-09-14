import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOrdersController } from './service-orders.controller';
import { CreateOrdemDeServicoUseCase } from '../application/use-cases/create-service-orders.usecase';
import { GetOrdemDeServicoUseCase } from '../application/use-cases/get-service-orders.usecase';
import { AddServicoToOsUseCase } from '../application/use-cases/add-service-to-order.usecase';
import { RemoveServicoFromOsUseCase } from '../application/use-cases/remove-service-from-order.usecase';
import { AddPecaToOsUseCase } from '../application/use-cases/add-part-to-order.usecase';
import { RemovePecaFromOsUseCase } from '../application/use-cases/remove-part-from-order.usecase';
import { StartDiagnosisUseCase } from '../application/use-cases/start-diagnosis.usecase';
import { FinishDiagnosisUseCase } from '../application/use-cases/finish-diagnosis.usecase';
import { IniciarExecucaoUseCase } from '../application/use-cases/iniciar-execucao.usecase';
import { RealizarServicoUseCase } from '../application/use-cases/realizar-servico.usecase';
import { UtilizarPecaUseCase } from '../application/use-cases/utilizar-peca.usecase';
import { FinishOrderUseCase } from '../application/use-cases/finish-order.usecase';
import { LiberarVeiculoUseCase } from '../application/use-cases/liberar-veiculo.usecase';
import { DeliverOrderUseCase } from '../application/use-cases/deliver-order.usecase';
import { GetOrcamentoUseCase } from '../../orcamentos/application/use-cases/get-orcamento.usecase';
import { GetOsAcompanhamentoUseCase } from '../application/use-cases/get-os-acompanhamento.usecase';
import { GetTempoMedioOsUseCase } from '../application/use-cases/get-tempo-medio-os.usecase';
import { ConsultaPublicaOsUseCase } from '../application/use-cases/consulta-publica-os.usecase';
import { ProcessarWebhookNotificacaoUseCase } from '../application/use-cases/processar-webhook-notificacao.usecase';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthenticatedActor } from '../../auth/decorators/current-user.decorator';
import { CLIENTE_ROLE, UserRole } from '../../auth/domain/enums/user-role.enum';

const uc = (val: any = { id: 'os-1' }) => ({ execute: jest.fn().mockResolvedValue(val), executeAll: jest.fn().mockResolvedValue([val]) });

const STAFF: AuthenticatedActor = { sub: 'user-1', role: UserRole.ATENDENTE, email: 'a@b.c' };
const CLIENTE: AuthenticatedActor = { sub: 'cliente-1', role: CLIENTE_ROLE, documento: '12345678901' };

describe('ServiceOrdersController', () => {
    let controller: ServiceOrdersController;
    let createUC: { execute: jest.Mock };
    let getUC: { execute: jest.Mock; executeAll: jest.Mock };
    let addServicoUC: { execute: jest.Mock };
    let removeServicoUC: { execute: jest.Mock };
    let addPecaUC: { execute: jest.Mock };
    let removePecaUC: { execute: jest.Mock };
    let startDiagUC: { execute: jest.Mock };
    let finishDiagUC: { execute: jest.Mock };
    let iniciarExecUC: { execute: jest.Mock };
    let realizarServicoUC: { execute: jest.Mock };
    let utilizarPecaUC: { execute: jest.Mock };
    let finishOrderUC: { execute: jest.Mock };
    let liberarVeiculoUC: { execute: jest.Mock };
    let deliverUC: { execute: jest.Mock };
    let getOrcamentoUC: { execute: jest.Mock; executeByOsId: jest.Mock };
    let getAcompanhamentoUC: { execute: jest.Mock };
    let getTempoMedioUC: { execute: jest.Mock };
    let consultaPublicaUC: { execute: jest.Mock };
    let processarWebhookUC: { execute: jest.Mock };

    beforeEach(async () => {
        createUC = { execute: jest.fn().mockResolvedValue({ id: 'os-1' }) };
        getUC = { execute: jest.fn().mockResolvedValue({ id: 'os-1' }), executeAll: jest.fn().mockResolvedValue([]) };
        addServicoUC = { execute: jest.fn().mockResolvedValue({ id: 'os-1' }) };
        removeServicoUC = { execute: jest.fn().mockResolvedValue({ id: 'os-1' }) };
        addPecaUC = { execute: jest.fn().mockResolvedValue({ id: 'os-1' }) };
        removePecaUC = { execute: jest.fn().mockResolvedValue({ id: 'os-1' }) };
        startDiagUC = { execute: jest.fn().mockResolvedValue({ id: 'os-1' }) };
        finishDiagUC = { execute: jest.fn().mockResolvedValue({ id: 'os-1' }) };
        iniciarExecUC = { execute: jest.fn().mockResolvedValue({ id: 'os-1' }) };
        realizarServicoUC = { execute: jest.fn().mockResolvedValue({ id: 'os-1' }) };
        utilizarPecaUC = { execute: jest.fn().mockResolvedValue({ id: 'os-1' }) };
        finishOrderUC = { execute: jest.fn().mockResolvedValue({ id: 'os-1' }) };
        liberarVeiculoUC = { execute: jest.fn().mockResolvedValue({ id: 'os-1' }) };
        deliverUC = { execute: jest.fn().mockResolvedValue({ id: 'os-1' }) };
        getOrcamentoUC = { execute: jest.fn().mockResolvedValue({ id: 'orc-1' }), executeByOsId: jest.fn().mockResolvedValue({ id: 'orc-1' }) };
        getAcompanhamentoUC = { execute: jest.fn().mockResolvedValue({ id: 'os-1', statusAtual: 'RECEBIDA' }) };
        getTempoMedioUC = { execute: jest.fn().mockResolvedValue({ totalOsConsideradas: 0, tempoMedioEmHoras: 0 }) };
        consultaPublicaUC = { execute: jest.fn().mockResolvedValue({ numero: 'OS-001', status: 'RECEBIDA' }) };
        processarWebhookUC = { execute: jest.fn().mockResolvedValue({ resultado: 'APLICADA', osId: 'os-1', statusAtual: 'APROVADA', mensagem: 'ok' }) };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ServiceOrdersController],
            providers: [
                { provide: CreateOrdemDeServicoUseCase, useValue: createUC },
                { provide: GetOrdemDeServicoUseCase, useValue: getUC },
                { provide: AddServicoToOsUseCase, useValue: addServicoUC },
                { provide: RemoveServicoFromOsUseCase, useValue: removeServicoUC },
                { provide: AddPecaToOsUseCase, useValue: addPecaUC },
                { provide: RemovePecaFromOsUseCase, useValue: removePecaUC },
                { provide: StartDiagnosisUseCase, useValue: startDiagUC },
                { provide: FinishDiagnosisUseCase, useValue: finishDiagUC },
                { provide: IniciarExecucaoUseCase, useValue: iniciarExecUC },
                { provide: RealizarServicoUseCase, useValue: realizarServicoUC },
                { provide: UtilizarPecaUseCase, useValue: utilizarPecaUC },
                { provide: FinishOrderUseCase, useValue: finishOrderUC },
                { provide: LiberarVeiculoUseCase, useValue: liberarVeiculoUC },
                { provide: DeliverOrderUseCase, useValue: deliverUC },
                { provide: GetOrcamentoUseCase, useValue: getOrcamentoUC },
                { provide: GetOsAcompanhamentoUseCase, useValue: getAcompanhamentoUC },
                { provide: GetTempoMedioOsUseCase, useValue: getTempoMedioUC },
                { provide: ConsultaPublicaOsUseCase, useValue: consultaPublicaUC },
                { provide: ProcessarWebhookNotificacaoUseCase, useValue: processarWebhookUC },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<ServiceOrdersController>(ServiceOrdersController);
    });

    it('create delegates to CreateOrdemDeServicoUseCase', async () => {
        const dto = { clienteId: 'c-1', veiculoId: 'v-1' };
        await controller.create(dto as any);
        expect(createUC.execute).toHaveBeenCalledWith(dto);
    });

    it('findAll delegates to GetOrdemDeServicoUseCase.executeAll', async () => {
        await controller.findAll(undefined, undefined, undefined);
        expect(getUC.executeAll).toHaveBeenCalled();
    });

    it('findOne delegates to GetOrdemDeServicoUseCase.execute', async () => {
        await controller.findOne('os-1');
        expect(getUC.execute).toHaveBeenCalledWith('os-1');
    });

    it('addServico delegates to AddServicoToOsUseCase', async () => {
        await controller.addServico('os-1', { servicoId: 's-1' });
        expect(addServicoUC.execute).toHaveBeenCalledWith('os-1', 's-1');
    });

    it('removeServico delegates to RemoveServicoFromOsUseCase', async () => {
        await controller.removeServico('os-1', 's-1');
        expect(removeServicoUC.execute).toHaveBeenCalledWith('os-1', 's-1');
    });

    it('addPeca delegates to AddPecaToOsUseCase', async () => {
        await controller.addPeca('os-1', { pecaId: 'p-1', quantidade: 2 });
        expect(addPecaUC.execute).toHaveBeenCalledWith('os-1', 'p-1', 2);
    });

    it('removePeca delegates to RemovePecaFromOsUseCase', async () => {
        await controller.removePeca('os-1', 'p-1');
        expect(removePecaUC.execute).toHaveBeenCalledWith('os-1', 'p-1');
    });

    it('startDiagnosis delegates to StartDiagnosisUseCase', async () => {
        await controller.startDiagnosis('os-1');
        expect(startDiagUC.execute).toHaveBeenCalledWith('os-1');
    });

    it('finishDiagnosis delegates to FinishDiagnosisUseCase', async () => {
        await controller.finishDiagnosis('os-1');
        expect(finishDiagUC.execute).toHaveBeenCalledWith('os-1');
    });

    it('iniciarExecucao delegates to IniciarExecucaoUseCase', async () => {
        await controller.iniciarExecucao('os-1');
        expect(iniciarExecUC.execute).toHaveBeenCalledWith('os-1');
    });

    it('realizarServico delegates to RealizarServicoUseCase', async () => {
        await controller.realizarServico('os-1', 'item-1', { inicio: '2024-01-01T08:00:00', fim: '2024-01-01T10:00:00' } as any);
        expect(realizarServicoUC.execute).toHaveBeenCalledTimes(1);
    });

    it('utilizarPeca delegates to UtilizarPecaUseCase', async () => {
        await controller.utilizarPeca('os-1', 'item-1');
        expect(utilizarPecaUC.execute).toHaveBeenCalledWith('os-1', 'item-1');
    });

    it('finalizarExecucao delegates to FinishOrderUseCase', async () => {
        await controller.finalizarExecucao('os-1');
        expect(finishOrderUC.execute).toHaveBeenCalledWith('os-1');
    });

    it('liberarVeiculo delegates to LiberarVeiculoUseCase', async () => {
        await controller.liberarVeiculo('os-1');
        expect(liberarVeiculoUC.execute).toHaveBeenCalledWith('os-1');
    });

    it('entregar delegates to DeliverOrderUseCase', async () => {
        await controller.entregar('os-1');
        expect(deliverUC.execute).toHaveBeenCalledWith('os-1');
    });

    it('getOrcamento delegates to GetOrcamentoUseCase.executeByOsId', async () => {
        await controller.getOrcamento('os-1');
        expect(getOrcamentoUC.executeByOsId).toHaveBeenCalledWith('os-1');
    });

    it('consultaPublica delegates to ConsultaPublicaOsUseCase', async () => {
        await controller.consultaPublica('OS-001', '12345678901');
        expect(consultaPublicaUC.execute).toHaveBeenCalledWith('OS-001', '12345678901');
    });

    it('getTempoMedio delegates to GetTempoMedioOsUseCase without dates', async () => {
        await controller.getTempoMedio(undefined, undefined);
        expect(getTempoMedioUC.execute).toHaveBeenCalledWith({ dataInicio: undefined, dataFim: undefined });
    });

    it('getTempoMedio passes parsed dates when provided', async () => {
        await controller.getTempoMedio('2024-01-01', '2024-12-31');
        expect(getTempoMedioUC.execute).toHaveBeenCalledWith({
            dataInicio: new Date('2024-01-01'),
            dataFim: new Date('2024-12-31'),
        });
    });

    it('getAcompanhamento não restringe quando quem chama é staff', async () => {
        await controller.getAcompanhamento(STAFF, 'os-1');
        expect(getAcompanhamentoUC.execute).toHaveBeenCalledWith('os-1', undefined);
    });

    it('getAcompanhamento restringe a OS ao próprio cliente', async () => {
        await controller.getAcompanhamento(CLIENTE, 'os-1');
        expect(getAcompanhamentoUC.execute).toHaveBeenCalledWith('os-1', 'cliente-1');
    });

    it('getStatus restringe a OS ao próprio cliente', async () => {
        await controller.getStatus(CLIENTE, 'os-1');
        expect(getAcompanhamentoUC.execute).toHaveBeenCalledWith('os-1', 'cliente-1');
    });

    it('findMinhas lista apenas as OS do cliente do token', async () => {
        await controller.findMinhas(CLIENTE);
        expect(getUC.executeAll).toHaveBeenCalledWith({
            clienteId: 'cliente-1',
            incluirArquivadas: true,
        });
    });
});
