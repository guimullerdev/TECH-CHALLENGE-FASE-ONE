import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import {
  ORDEM_DE_SERVICO_REPOSITORY,
  IOrdemDeServicoRepository,
} from '../../domain/repositories/service-orders.repository.interface';
import { StatusOS } from '../../domain/entities/service-orders.entity';
import { GetOrcamentoUseCase } from '../../../orcamentos/application/use-cases/get-orcamento.usecase';
import { AprovarOrcamentoUseCase } from '../../../orcamentos/application/use-cases/aprovar-orcamento.usecase';
import { ReprovarOrcamentoUseCase } from '../../../orcamentos/application/use-cases/reprovar-orcamento.usecase';
import { WebhookAcao } from '../dto/webhook-notificacao.dto';

export type WebhookResultado =
  | 'APLICADA'
  | 'IGNORADA_IDEMPOTENTE'
  | 'REJEITADA';

export interface WebhookNotificacaoResult {
  resultado: WebhookResultado;
  osId: string;
  statusAtual: StatusOS;
  mensagem: string;
}

@Injectable()
export class ProcessarWebhookNotificacaoUseCase {
  private readonly logger = new Logger('WebhookAudit');

  constructor(
    @Inject(ORDEM_DE_SERVICO_REPOSITORY)
    private readonly osRepo: IOrdemDeServicoRepository,
    private readonly getOrcamentoUseCase: GetOrcamentoUseCase,
    private readonly aprovarOrcamentoUseCase: AprovarOrcamentoUseCase,
    private readonly reprovarOrcamentoUseCase: ReprovarOrcamentoUseCase,
  ) {}

  async execute(
    dto: { osId: string; acao: WebhookAcao; observacoes?: string },
    ip: string,
  ): Promise<WebhookNotificacaoResult> {
    const os = await this.osRepo.findById(dto.osId);
    if (!os)
      throw new NotFoundException(
        `Ordem de serviço ${dto.osId} não encontrada`,
      );

    const resultado = await this.processar(os.status, dto, ip);

    this.logger.log(
      JSON.stringify({
        osId: dto.osId,
        acao: dto.acao,
        resultado: resultado.resultado,
        ip,
        timestamp: new Date().toISOString(),
      }),
    );

    return { ...resultado, osId: dto.osId, statusAtual: os.status };
  }

  private async processar(
    statusAtual: StatusOS,
    dto: { osId: string; acao: WebhookAcao; observacoes?: string },
    ip: string,
  ): Promise<Omit<WebhookNotificacaoResult, 'osId' | 'statusAtual'>> {
    // Idempotency: ação já foi aplicada anteriormente
    if (
      (dto.acao === WebhookAcao.APROVAR && statusAtual === StatusOS.APROVADA) ||
      (dto.acao === WebhookAcao.REPROVAR && statusAtual === StatusOS.REPROVADA)
    ) {
      return {
        resultado: 'IGNORADA_IDEMPOTENTE',
        mensagem: `Ação ${dto.acao} já foi aplicada anteriormente. Nenhuma alteração realizada.`,
      };
    }

    // Só aceita ação se OS estiver aguardando aprovação
    if (statusAtual !== StatusOS.AGUARDANDO_APROVACAO) {
      this.logger.warn(
        JSON.stringify({
          osId: dto.osId,
          acao: dto.acao,
          resultado: 'REJEITADA',
          motivo: `Status inválido: ${statusAtual}`,
          ip,
          timestamp: new Date().toISOString(),
        }),
      );
      throw new UnprocessableEntityException(
        `Não é possível ${dto.acao.toLowerCase()} orçamento: OS está em status ${statusAtual}. Esperado: AGUARDANDO_APROVACAO`,
      );
    }

    const orcamento = await this.getOrcamentoUseCase.executeByOsId(dto.osId);

    if (dto.acao === WebhookAcao.APROVAR) {
      await this.aprovarOrcamentoUseCase.execute(orcamento.id, dto.observacoes);
      return {
        resultado: 'APLICADA',
        mensagem: 'Orçamento aprovado com sucesso.',
      };
    }

    await this.reprovarOrcamentoUseCase.execute(orcamento.id, dto.observacoes);
    return {
      resultado: 'APLICADA',
      mensagem: 'Orçamento reprovado com sucesso.',
    };
  }
}
