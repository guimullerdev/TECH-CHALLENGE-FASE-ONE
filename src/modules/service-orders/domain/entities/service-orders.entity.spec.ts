import {
    OrdemDeServico,
    StatusOS,
    InvalidTransitionError,
    InsufficientStockError,
} from './service-orders.entity';

const baseOS = () =>
    OrdemDeServico.create({ numero: 'OS-001', clienteId: 'cliente-1', veiculoId: 'veiculo-1' });

const servicoItem = (servicoId = 'svc-1', precoUnitario = 100) => ({
    id: 'item-s-1',
    servicoId,
    precoUnitario,
    status: 'pendente' as const,
});

const pecaItem = (pecaId = 'peca-1', valorUnitario = 50, quantidade = 2) => ({
    id: 'item-p-1',
    pecaId,
    valorUnitario,
    quantidade,
    status: 'reservada' as const,
});

describe('OrdemDeServico entity', () => {
    describe('create()', () => {
        it('creates with RECEBIDA status and empty items', () => {
            const os = baseOS();
            expect(os.status).toBe(StatusOS.RECEBIDA);
            expect(os.servicos).toEqual([]);
            expect(os.pecas).toEqual([]);
            expect(os.numero).toBe('OS-001');
        });

        it('records RECEBIDA in historicoStatus on creation', () => {
            const os = baseOS();
            expect(os.historicoStatus).toHaveLength(1);
            expect(os.historicoStatus[0].statusNovo).toBe(StatusOS.RECEBIDA);
            expect(os.historicoStatus[0].statusAnterior).toBeNull();
        });

        it('throws when clienteId is missing', () => {
            expect(() => OrdemDeServico.create({ numero: 'OS-1', clienteId: '', veiculoId: 'v1' }))
                .toThrow('clienteId');
        });

        it('throws when veiculoId is missing', () => {
            expect(() => OrdemDeServico.create({ numero: 'OS-1', clienteId: 'c1', veiculoId: '' }))
                .toThrow('veiculoId');
        });

        it('throws when numero is missing', () => {
            expect(() => OrdemDeServico.create({ numero: '', clienteId: 'c1', veiculoId: 'v1' }))
                .toThrow('numero');
        });
    });

    describe('addServico()', () => {
        it('adds a servico', () => {
            const os = baseOS().addServico(servicoItem('svc-1', 100));
            expect(os.servicos).toHaveLength(1);
        });

        it('throws on duplicate servico', () => {
            const os = baseOS().addServico(servicoItem('svc-1', 100));
            expect(() => os.addServico(servicoItem('svc-1', 100))).toThrow('já adicionado');
        });
    });

    describe('removeServico()', () => {
        it('removes a servico', () => {
            const os = baseOS().addServico(servicoItem('svc-1', 100)).removeServico('svc-1');
            expect(os.servicos).toHaveLength(0);
        });

        it('throws when servico not in OS', () => {
            expect(() => baseOS().removeServico('nonexistent')).toThrow('não encontrado');
        });
    });

    describe('addPeca()', () => {
        it('adds a peca', () => {
            const os = baseOS().addPeca(pecaItem('peca-1', 50, 3));
            expect(os.pecas).toHaveLength(1);
        });

        it('throws when quantidade < 1', () => {
            expect(() => baseOS().addPeca(pecaItem('peca-1', 50, 0))).toThrow('Quantidade');
        });

        it('throws on duplicate peca', () => {
            const os = baseOS().addPeca(pecaItem('peca-1', 50, 1));
            expect(() => os.addPeca(pecaItem('peca-1', 50, 1))).toThrow('já adicionada');
        });
    });

    describe('removePeca()', () => {
        it('removes a peca', () => {
            const os = baseOS().addPeca(pecaItem()).removePeca('peca-1');
            expect(os.pecas).toHaveLength(0);
        });

        it('throws when peca not in OS', () => {
            expect(() => baseOS().removePeca('nonexistent')).toThrow('não encontrada');
        });
    });

    describe('calcularTotal()', () => {
        it('returns 0 for empty OS', () => {
            expect(baseOS().calcularTotal()).toBe(0);
        });

        it('sums servicos + pecas × quantidade', () => {
            const os = baseOS()
                .addServico(servicoItem('svc-1', 100))
                .addPeca(pecaItem('peca-1', 40, 3));
            expect(os.calcularTotal()).toBe(220);
        });
    });

    describe('iniciarDiagnostico()', () => {
        it('transitions RECEBIDA → EM_DIAGNOSTICO', () => {
            expect(baseOS().iniciarDiagnostico().status).toBe(StatusOS.EM_DIAGNOSTICO);
        });

        it('records transition in historicoStatus', () => {
            const os = baseOS().iniciarDiagnostico();
            const last = os.historicoStatus[os.historicoStatus.length - 1];
            expect(last.statusAnterior).toBe(StatusOS.RECEBIDA);
            expect(last.statusNovo).toBe(StatusOS.EM_DIAGNOSTICO);
        });

        it('throws InvalidTransitionError when not RECEBIDA', () => {
            expect(() => baseOS().iniciarDiagnostico().iniciarDiagnostico()).toThrow(InvalidTransitionError);
        });
    });

    describe('concluirDiagnostico()', () => {
        it('transitions EM_DIAGNOSTICO → AGUARDANDO_APROVACAO', () => {
            const os = baseOS().iniciarDiagnostico().concluirDiagnostico();
            expect(os.status).toBe(StatusOS.AGUARDANDO_APROVACAO);
        });

        it('throws InvalidTransitionError when not EM_DIAGNOSTICO', () => {
            expect(() => baseOS().concluirDiagnostico()).toThrow(InvalidTransitionError);
        });
    });

    describe('aprovarOrcamento()', () => {
        it('transitions AGUARDANDO_APROVACAO → APROVADA', () => {
            const os = baseOS().iniciarDiagnostico().concluirDiagnostico().aprovarOrcamento();
            expect(os.status).toBe(StatusOS.APROVADA);
        });

        it('throws InvalidTransitionError when not AGUARDANDO_APROVACAO', () => {
            expect(() => baseOS().aprovarOrcamento()).toThrow(InvalidTransitionError);
        });
    });

    describe('reprovarOrcamento()', () => {
        it('transitions AGUARDANDO_APROVACAO → REPROVADA', () => {
            const os = baseOS().iniciarDiagnostico().concluirDiagnostico().reprovarOrcamento();
            expect(os.status).toBe(StatusOS.REPROVADA);
        });

        it('throws InvalidTransitionError when not AGUARDANDO_APROVACAO', () => {
            expect(() => baseOS().reprovarOrcamento()).toThrow(InvalidTransitionError);
        });
    });

    describe('iniciarExecucao()', () => {
        it('transitions APROVADA → EM_EXECUCAO', () => {
            const os = baseOS().iniciarDiagnostico().concluirDiagnostico().aprovarOrcamento().iniciarExecucao();
            expect(os.status).toBe(StatusOS.EM_EXECUCAO);
        });

        it('throws InvalidTransitionError when not APROVADA', () => {
            expect(() => baseOS().iniciarExecucao()).toThrow(InvalidTransitionError);
        });
    });

    describe('finalizarExecucao()', () => {
        it('transitions EM_EXECUCAO → FINALIZADA and sets dataFechamento', () => {
            const os = baseOS()
                .iniciarDiagnostico().concluirDiagnostico()
                .aprovarOrcamento().iniciarExecucao().finalizarExecucao();
            expect(os.status).toBe(StatusOS.FINALIZADA);
            expect(os.dataFechamento).toBeInstanceOf(Date);
        });

        it('throws InvalidTransitionError when not EM_EXECUCAO', () => {
            expect(() => baseOS().finalizarExecucao()).toThrow(InvalidTransitionError);
        });
    });

    describe('entregar()', () => {
        it('transitions FINALIZADA → ENTREGUE', () => {
            const os = baseOS()
                .iniciarDiagnostico().concluirDiagnostico()
                .aprovarOrcamento().iniciarExecucao().finalizarExecucao().entregar();
            expect(os.status).toBe(StatusOS.ENTREGUE);
        });

        it('throws InvalidTransitionError when not FINALIZADA', () => {
            expect(() => baseOS().entregar()).toThrow(InvalidTransitionError);
        });
    });

    describe('full happy-path flow', () => {
        it('RECEBIDA → EM_DIAGNOSTICO → AGUARDANDO_APROVACAO → APROVADA → EM_EXECUCAO → FINALIZADA → ENTREGUE', () => {
            const statuses: StatusOS[] = [];
            let os = baseOS();
            statuses.push(os.status);
            os = os.iniciarDiagnostico(); statuses.push(os.status);
            os = os.concluirDiagnostico(); statuses.push(os.status);
            os = os.aprovarOrcamento(); statuses.push(os.status);
            os = os.iniciarExecucao(); statuses.push(os.status);
            os = os.finalizarExecucao(); statuses.push(os.status);
            os = os.entregar(); statuses.push(os.status);
            expect(statuses).toEqual([
                StatusOS.RECEBIDA,
                StatusOS.EM_DIAGNOSTICO,
                StatusOS.AGUARDANDO_APROVACAO,
                StatusOS.APROVADA,
                StatusOS.EM_EXECUCAO,
                StatusOS.FINALIZADA,
                StatusOS.ENTREGUE,
            ]);
            expect(os.historicoStatus).toHaveLength(7);
        });
    });

    describe('registrarExecucaoServico()', () => {
        it('updates inicioExec, fimExec and status to realizado', () => {
            const inicio = new Date('2024-01-01T08:00:00');
            const fim = new Date('2024-01-01T10:00:00');
            const os = baseOS()
                .addServico({ id: 'item-s-1', servicoId: 'svc-1', precoUnitario: 100, status: 'pendente' })
                .registrarExecucaoServico('item-s-1', inicio, fim);
            expect(os.servicos[0].inicioExec).toEqual(inicio);
            expect(os.servicos[0].fimExec).toEqual(fim);
            expect(os.servicos[0].status).toBe('realizado');
        });

        it('throws when item not found', () => {
            expect(() => baseOS().registrarExecucaoServico('nonexistent', new Date(), new Date())).toThrow('não encontrado');
        });
    });

    describe('marcarPecaUtilizada()', () => {
        it('sets status to utilizada', () => {
            const os = baseOS()
                .addPeca({ id: 'item-p-1', pecaId: 'peca-1', quantidade: 1, valorUnitario: 50, status: 'reservada' })
                .marcarPecaUtilizada('item-p-1');
            expect(os.pecas[0].status).toBe('utilizada');
        });

        it('throws when item not found', () => {
            expect(() => baseOS().marcarPecaUtilizada('nonexistent')).toThrow('não encontrado');
        });
    });

    describe('vincularOrcamento()', () => {
        it('sets orcamentoId', () => {
            const os = baseOS().vincularOrcamento('orc-123');
            expect(os.orcamentoId).toBe('orc-123');
        });
    });
});

describe('OrdemDeServico.toJSON()', () => {
    it('returns a plain object with all fields including arquivada', () => {
        const os = baseOS();
        const json = os.toJSON();
        expect(json.id).toBe(os.id);
        expect(json.numero).toBe('OS-001');
        expect(json.clienteId).toBe('cliente-1');
        expect(json.veiculoId).toBe('veiculo-1');
        expect(json.status).toBe(StatusOS.RECEBIDA);
        expect(json.arquivada).toBe(false);
        expect(json.servicos).toEqual([]);
        expect(json.pecas).toEqual([]);
    });
});

describe('arquivada flag', () => {
    it('starts as false on create()', () => {
        expect(baseOS().arquivada).toBe(false);
    });

    it('is set to true when finalizarExecucao()', () => {
        const os = baseOS()
            .iniciarDiagnostico().concluirDiagnostico()
            .aprovarOrcamento().iniciarExecucao().finalizarExecucao();
        expect(os.arquivada).toBe(true);
        expect(os.status).toBe(StatusOS.FINALIZADA);
    });

    it('is set to true when entregar()', () => {
        const os = baseOS()
            .iniciarDiagnostico().concluirDiagnostico()
            .aprovarOrcamento().iniciarExecucao().finalizarExecucao().entregar();
        expect(os.arquivada).toBe(true);
        expect(os.status).toBe(StatusOS.ENTREGUE);
    });

    it('remains false through all intermediate transitions', () => {
        const stages = [
            baseOS(),
            baseOS().iniciarDiagnostico(),
            baseOS().iniciarDiagnostico().concluirDiagnostico(),
            baseOS().iniciarDiagnostico().concluirDiagnostico().aprovarOrcamento(),
            baseOS().iniciarDiagnostico().concluirDiagnostico().aprovarOrcamento().iniciarExecucao(),
        ];
        stages.forEach(os => expect(os.arquivada).toBe(false));
    });
});

describe('InsufficientStockError', () => {
    it('sets name and message correctly', () => {
        const err = new InsufficientStockError('peca-1', 5, 2);
        expect(err.name).toBe('InsufficientStockError');
        expect(err.message).toContain('peca-1');
        expect(err.message).toContain('5');
        expect(err.message).toContain('2');
    });
});

// Alimenta o dashboard "tempo médio de execução por status" exigido pelo PDF.
// Sem esse cálculo o dado existiria só no Postgres, que o New Relic não lê.
describe('duracaoUltimoStatusSegundos', () => {
    it('é undefined numa OS recém-criada — não há intervalo anterior a medir', () => {
        expect(baseOS().duracaoUltimoStatusSegundos).toBeUndefined();
    });

    it('mede o intervalo entre as duas últimas transições', () => {
        jest.useFakeTimers().setSystemTime(new Date('2026-01-01T10:00:00Z'));
        const recebida = baseOS();

        jest.setSystemTime(new Date('2026-01-01T10:05:00Z'));
        const emDiagnostico = recebida.iniciarDiagnostico();

        expect(emDiagnostico.duracaoUltimoStatusSegundos).toBe(300);
        jest.useRealTimers();
    });

    it('considera só a última transição, não o tempo total da OS', () => {
        jest.useFakeTimers().setSystemTime(new Date('2026-01-01T10:00:00Z'));
        const recebida = baseOS();

        jest.setSystemTime(new Date('2026-01-01T10:30:00Z'));
        const emDiagnostico = recebida.iniciarDiagnostico();

        jest.setSystemTime(new Date('2026-01-01T10:32:00Z'));
        const diagnosticado = emDiagnostico.concluirDiagnostico();

        // 2 min no diagnóstico, não os 32 min desde a abertura
        expect(diagnosticado.duracaoUltimoStatusSegundos).toBe(120);
        jest.useRealTimers();
    });
});
