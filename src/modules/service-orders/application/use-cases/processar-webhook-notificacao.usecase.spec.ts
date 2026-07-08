import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ProcessarWebhookNotificacaoUseCase } from './processar-webhook-notificacao.usecase';
import { WebhookAcao } from '../dto/webhook-notificacao.dto';
import {
  OrdemDeServico,
  StatusOS,
} from '../../domain/entities/service-orders.entity';
import { IOrdemDeServicoRepository } from '../../domain/repositories/service-orders.repository.interface';
import {
  Orcamento,
  StatusOrcamento,
} from '../../../orcamentos/domain/entities/orcamento.entity';

const makeOs = (status: StatusOS): OrdemDeServico =>
  OrdemDeServico.restore({
    id: 'os-1',
    numero: 'OS-001',
    clienteId: 'c-1',
    veiculoId: 'v-1',
    status,
    arquivada: false,
    servicos: [],
    pecas: [],
    historicoStatus: [],
    dataAbertura: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

const makeOrcamento = (): Orcamento =>
  Orcamento.restore({
    id: 'orc-1',
    osId: 'os-1',
    status: StatusOrcamento.ENVIADO,
    valorTotal: 500,
    dataGeracao: new Date(),
    dataEnvio: new Date(),
    dataResposta: undefined,
    observacoes: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

const mockOsRepo = (): jest.Mocked<IOrdemDeServicoRepository> => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  generateNumero: jest.fn(),
});
const mockGetOrcamento = () => ({ executeByOsId: jest.fn() });
const mockAprovar = () => ({ execute: jest.fn() });
const mockReprovar = () => ({ execute: jest.fn() });

function makeUseCase() {
  const osRepo = mockOsRepo();
  const getOrc = mockGetOrcamento();
  const aprovar = mockAprovar();
  const reprovar = mockReprovar();
  const useCase = new ProcessarWebhookNotificacaoUseCase(
    osRepo as any,
    getOrc as any,
    aprovar as any,
    reprovar as any,
  );
  return { osRepo, getOrc, aprovar, reprovar, useCase };
}

describe('ProcessarWebhookNotificacaoUseCase', () => {
  describe('OS não encontrada', () => {
    it('throws NotFoundException', async () => {
      const { osRepo, useCase } = makeUseCase();
      osRepo.findById.mockResolvedValue(null);

      await expect(
        useCase.execute(
          { osId: 'os-x', acao: WebhookAcao.APROVAR },
          '127.0.0.1',
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('APROVAR — OS em AGUARDANDO_APROVACAO', () => {
    it('chama aprovarOrcamentoUseCase e retorna APLICADA', async () => {
      const { osRepo, getOrc, aprovar, useCase } = makeUseCase();
      osRepo.findById.mockResolvedValue(makeOs(StatusOS.AGUARDANDO_APROVACAO));
      getOrc.executeByOsId.mockResolvedValue(makeOrcamento());
      aprovar.execute.mockResolvedValue({});

      const result = await useCase.execute(
        { osId: 'os-1', acao: WebhookAcao.APROVAR },
        '10.0.0.1',
      );

      expect(aprovar.execute).toHaveBeenCalledWith('orc-1', undefined);
      expect(result.resultado).toBe('APLICADA');
    });

    it('passa observacoes para aprovarOrcamentoUseCase', async () => {
      const { osRepo, getOrc, aprovar, useCase } = makeUseCase();
      osRepo.findById.mockResolvedValue(makeOs(StatusOS.AGUARDANDO_APROVACAO));
      getOrc.executeByOsId.mockResolvedValue(makeOrcamento());
      aprovar.execute.mockResolvedValue({});

      await useCase.execute(
        { osId: 'os-1', acao: WebhookAcao.APROVAR, observacoes: 'ok' },
        '10.0.0.1',
      );

      expect(aprovar.execute).toHaveBeenCalledWith('orc-1', 'ok');
    });
  });

  describe('REPROVAR — OS em AGUARDANDO_APROVACAO', () => {
    it('chama reprovarOrcamentoUseCase e retorna APLICADA', async () => {
      const { osRepo, getOrc, reprovar, useCase } = makeUseCase();
      osRepo.findById.mockResolvedValue(makeOs(StatusOS.AGUARDANDO_APROVACAO));
      getOrc.executeByOsId.mockResolvedValue(makeOrcamento());
      reprovar.execute.mockResolvedValue({});

      const result = await useCase.execute(
        {
          osId: 'os-1',
          acao: WebhookAcao.REPROVAR,
          observacoes: 'Fora do orçamento',
        },
        '10.0.0.2',
      );

      expect(reprovar.execute).toHaveBeenCalledWith(
        'orc-1',
        'Fora do orçamento',
      );
      expect(result.resultado).toBe('APLICADA');
    });
  });

  describe('Idempotência', () => {
    it('retorna IGNORADA_IDEMPOTENTE quando APROVAR e OS já está APROVADA', async () => {
      const { osRepo, aprovar, useCase } = makeUseCase();
      osRepo.findById.mockResolvedValue(makeOs(StatusOS.APROVADA));

      const result = await useCase.execute(
        { osId: 'os-1', acao: WebhookAcao.APROVAR },
        '1.2.3.4',
      );

      expect(aprovar.execute).not.toHaveBeenCalled();
      expect(result.resultado).toBe('IGNORADA_IDEMPOTENTE');
    });

    it('retorna IGNORADA_IDEMPOTENTE quando REPROVAR e OS já está REPROVADA', async () => {
      const { osRepo, reprovar, useCase } = makeUseCase();
      osRepo.findById.mockResolvedValue(makeOs(StatusOS.REPROVADA));

      const result = await useCase.execute(
        { osId: 'os-1', acao: WebhookAcao.REPROVAR },
        '1.2.3.4',
      );

      expect(reprovar.execute).not.toHaveBeenCalled();
      expect(result.resultado).toBe('IGNORADA_IDEMPOTENTE');
    });
  });

  describe('Rejeição por status inválido', () => {
    const invalidStatuses = [
      StatusOS.RECEBIDA,
      StatusOS.EM_DIAGNOSTICO,
      StatusOS.EM_EXECUCAO,
      StatusOS.FINALIZADA,
      StatusOS.ENTREGUE,
    ];

    it.each(invalidStatuses)('lança 422 quando status é %s', async (status) => {
      const { osRepo, useCase } = makeUseCase();
      osRepo.findById.mockResolvedValue(makeOs(status));

      await expect(
        useCase.execute({ osId: 'os-1', acao: WebhookAcao.APROVAR }, '1.2.3.4'),
      ).rejects.toThrow(UnprocessableEntityException);
    });

    it('lança 422 quando APROVAR e OS está REPROVADA (ação conflitante)', async () => {
      const { osRepo, useCase } = makeUseCase();
      osRepo.findById.mockResolvedValue(makeOs(StatusOS.REPROVADA));

      await expect(
        useCase.execute({ osId: 'os-1', acao: WebhookAcao.APROVAR }, '1.2.3.4'),
      ).rejects.toThrow(UnprocessableEntityException);
    });

    it('lança 422 quando REPROVAR e OS está APROVADA (ação conflitante)', async () => {
      const { osRepo, useCase } = makeUseCase();
      osRepo.findById.mockResolvedValue(makeOs(StatusOS.APROVADA));

      await expect(
        useCase.execute(
          { osId: 'os-1', acao: WebhookAcao.REPROVAR },
          '1.2.3.4',
        ),
      ).rejects.toThrow(UnprocessableEntityException);
    });
  });
});
