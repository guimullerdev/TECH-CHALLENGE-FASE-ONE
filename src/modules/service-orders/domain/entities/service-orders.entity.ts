import { HistoricoStatusOS } from './historico-status-os.entity';

export enum StatusOS {
    RECEBIDA = 'RECEBIDA',
    EM_DIAGNOSTICO = 'EM_DIAGNOSTICO',
    AGUARDANDO_APROVACAO = 'AGUARDANDO_APROVACAO',
    APROVADA = 'APROVADA',
    REPROVADA = 'REPROVADA',
    EM_EXECUCAO = 'EM_EXECUCAO',
    FINALIZADA = 'FINALIZADA',
    ENTREGUE = 'ENTREGUE',
}

export interface OsItemServico {
    id: string;
    servicoId: string;
    descricao?: string;
    precoUnitario: number;
    status: 'pendente' | 'realizado';
    inicioExec?: Date;
    fimExec?: Date;
}

export interface OsItemPeca {
    id: string;
    pecaId: string;
    quantidade: number;
    valorUnitario: number;
    status: 'reservada' | 'utilizada';
}

export interface OrdemDeServicoProps {
    id: string;
    numero: string;
    clienteId: string;
    veiculoId: string;
    orcamentoId?: string;
    status: StatusOS;
    arquivada: boolean;
    descricaoProblema?: string;
    servicos: OsItemServico[];
    pecas: OsItemPeca[];
    historicoStatus: HistoricoStatusOS[];
    dataAbertura: Date;
    dataFechamento?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export class OrdemDeServico {
    private constructor(private readonly props: OrdemDeServicoProps) {}

    get id() { return this.props.id; }
    get numero() { return this.props.numero; }
    get clienteId() { return this.props.clienteId; }
    get veiculoId() { return this.props.veiculoId; }
    get orcamentoId() { return this.props.orcamentoId; }
    get status() { return this.props.status; }
    get arquivada() { return this.props.arquivada; }
    get descricaoProblema() { return this.props.descricaoProblema; }
    get servicos() { return this.props.servicos; }
    get pecas() { return this.props.pecas; }
    get historicoStatus() { return this.props.historicoStatus; }
    get dataAbertura() { return this.props.dataAbertura; }
    get dataFechamento() { return this.props.dataFechamento; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }

    static create(props: {
        numero: string;
        clienteId: string;
        veiculoId: string;
        descricaoProblema?: string;
    }): OrdemDeServico {
        if (!props.clienteId) throw new Error('clienteId é obrigatório');
        if (!props.veiculoId) throw new Error('veiculoId é obrigatório');
        if (!props.numero) throw new Error('numero é obrigatório');

        const historico = HistoricoStatusOS.create({ statusAnterior: null, statusNovo: StatusOS.RECEBIDA });

        return new OrdemDeServico({
            id: crypto.randomUUID(),
            numero: props.numero,
            clienteId: props.clienteId,
            veiculoId: props.veiculoId,
            descricaoProblema: props.descricaoProblema,
            status: StatusOS.RECEBIDA,
            arquivada: false,
            servicos: [],
            pecas: [],
            historicoStatus: [historico],
            dataAbertura: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    static restore(props: OrdemDeServicoProps): OrdemDeServico {
        return new OrdemDeServico(props);
    }

    update(props: Partial<{ descricaoProblema: string }>): OrdemDeServico {
        return new OrdemDeServico({
            ...this.props,
            descricaoProblema: props.descricaoProblema ?? this.props.descricaoProblema,
            updatedAt: new Date(),
        });
    }

    vincularOrcamento(orcamentoId: string): OrdemDeServico {
        return new OrdemDeServico({ ...this.props, orcamentoId, updatedAt: new Date() });
    }

    addServico(item: OsItemServico): OrdemDeServico {
        if (this.props.servicos.some(s => s.servicoId === item.servicoId)) {
            throw new Error('Serviço já adicionado à OS');
        }
        return new OrdemDeServico({
            ...this.props,
            servicos: [...this.props.servicos, { ...item, status: 'pendente' }],
            updatedAt: new Date(),
        });
    }

    removeServico(servicoId: string): OrdemDeServico {
        if (!this.props.servicos.some(s => s.servicoId === servicoId)) {
            throw new Error('Serviço não encontrado na OS');
        }
        return new OrdemDeServico({
            ...this.props,
            servicos: this.props.servicos.filter(s => s.servicoId !== servicoId),
            updatedAt: new Date(),
        });
    }

    addPeca(item: OsItemPeca): OrdemDeServico {
        if (item.quantidade < 1) throw new Error('Quantidade deve ser >= 1');
        if (this.props.pecas.some(p => p.pecaId === item.pecaId)) {
            throw new Error('Peça já adicionada à OS');
        }
        return new OrdemDeServico({
            ...this.props,
            pecas: [...this.props.pecas, { ...item, status: 'reservada' }],
            updatedAt: new Date(),
        });
    }

    removePeca(pecaId: string): OrdemDeServico {
        if (!this.props.pecas.some(p => p.pecaId === pecaId)) {
            throw new Error('Peça não encontrada na OS');
        }
        return new OrdemDeServico({
            ...this.props,
            pecas: this.props.pecas.filter(p => p.pecaId !== pecaId),
            updatedAt: new Date(),
        });
    }

    calcularTotal(): number {
        const totalServicos = this.props.servicos.reduce((sum, s) => sum + s.precoUnitario, 0);
        const totalPecas = this.props.pecas.reduce((sum, p) => sum + p.valorUnitario * p.quantidade, 0);
        return Math.round((totalServicos + totalPecas) * 100) / 100;
    }

    registrarExecucaoServico(itemId: string, inicio: Date, fim: Date): OrdemDeServico {
        const item = this.props.servicos.find(s => s.id === itemId);
        if (!item) throw new Error('Item de serviço não encontrado na OS');
        const updatedServicos = this.props.servicos.map(s =>
            s.id === itemId ? { ...s, inicioExec: inicio, fimExec: fim, status: 'realizado' as const } : s,
        );
        return new OrdemDeServico({ ...this.props, servicos: updatedServicos, updatedAt: new Date() });
    }

    marcarPecaUtilizada(itemId: string): OrdemDeServico {
        const item = this.props.pecas.find(p => p.id === itemId);
        if (!item) throw new Error('Item de peça não encontrado na OS');
        const updatedPecas = this.props.pecas.map(p =>
            p.id === itemId ? { ...p, status: 'utilizada' as const } : p,
        );
        return new OrdemDeServico({ ...this.props, pecas: updatedPecas, updatedAt: new Date() });
    }

    private transicionar(novoStatus: StatusOS): OrdemDeServico {
        const historico = HistoricoStatusOS.create({ statusAnterior: this.props.status, statusNovo: novoStatus });
        return new OrdemDeServico({
            ...this.props,
            status: novoStatus,
            historicoStatus: [...this.props.historicoStatus, historico],
            updatedAt: new Date(),
        });
    }

    iniciarDiagnostico(): OrdemDeServico {
        if (this.props.status !== StatusOS.RECEBIDA) {
            throw new InvalidTransitionError(
                `Transição inválida: ${this.props.status} → EM_DIAGNOSTICO. Status esperado: RECEBIDA`,
            );
        }
        return this.transicionar(StatusOS.EM_DIAGNOSTICO);
    }

    concluirDiagnostico(): OrdemDeServico {
        if (this.props.status !== StatusOS.EM_DIAGNOSTICO) {
            throw new InvalidTransitionError(
                `Transição inválida: ${this.props.status} → AGUARDANDO_APROVACAO. Status esperado: EM_DIAGNOSTICO`,
            );
        }
        return this.transicionar(StatusOS.AGUARDANDO_APROVACAO);
    }

    aprovarOrcamento(): OrdemDeServico {
        if (this.props.status !== StatusOS.AGUARDANDO_APROVACAO) {
            throw new InvalidTransitionError(
                `Transição inválida: ${this.props.status} → APROVADA. Status esperado: AGUARDANDO_APROVACAO`,
            );
        }
        return this.transicionar(StatusOS.APROVADA);
    }

    reprovarOrcamento(): OrdemDeServico {
        if (this.props.status !== StatusOS.AGUARDANDO_APROVACAO) {
            throw new InvalidTransitionError(
                `Transição inválida: ${this.props.status} → REPROVADA. Status esperado: AGUARDANDO_APROVACAO`,
            );
        }
        return this.transicionar(StatusOS.REPROVADA);
    }

    iniciarExecucao(): OrdemDeServico {
        if (this.props.status !== StatusOS.APROVADA) {
            throw new InvalidTransitionError(
                `Transição inválida: ${this.props.status} → EM_EXECUCAO. Status esperado: APROVADA`,
            );
        }
        return this.transicionar(StatusOS.EM_EXECUCAO);
    }

    finalizarExecucao(): OrdemDeServico {
        if (this.props.status !== StatusOS.EM_EXECUCAO) {
            throw new InvalidTransitionError(
                `Transição inválida: ${this.props.status} → FINALIZADA. Status esperado: EM_EXECUCAO`,
            );
        }
        return new OrdemDeServico({
            ...this.transicionar(StatusOS.FINALIZADA).props,
            dataFechamento: new Date(),
            arquivada: true,
        });
    }

    entregar(): OrdemDeServico {
        if (this.props.status !== StatusOS.FINALIZADA) {
            throw new InvalidTransitionError(
                `Transição inválida: ${this.props.status} → ENTREGUE. Status esperado: FINALIZADA`,
            );
        }
        return new OrdemDeServico({
            ...this.transicionar(StatusOS.ENTREGUE).props,
            arquivada: true,
        });
    }

    toJSON() {
        return {
            id: this.props.id,
            numero: this.props.numero,
            clienteId: this.props.clienteId,
            veiculoId: this.props.veiculoId,
            orcamentoId: this.props.orcamentoId,
            status: this.props.status,
            arquivada: this.props.arquivada,
            descricaoProblema: this.props.descricaoProblema,
            servicos: this.props.servicos,
            pecas: this.props.pecas,
            historicoStatus: this.props.historicoStatus,
            dataAbertura: this.props.dataAbertura,
            dataFechamento: this.props.dataFechamento,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt,
        };
    }
}

export class InvalidTransitionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidTransitionError';
    }
}

export class InsufficientStockError extends Error {
    constructor(partId: string, requested: number, available: number) {
        super(
            `Estoque insuficiente para a peça ${partId}: solicitado ${requested}, disponível ${available}`,
        );
        this.name = 'InsufficientStockError';
    }
}
