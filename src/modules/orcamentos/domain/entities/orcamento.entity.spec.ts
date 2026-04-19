import { Orcamento, StatusOrcamento, OrcamentoTransitionError } from './orcamento.entity';

const baseOrcamento = (valorTotal = 500) =>
    Orcamento.create({ osId: 'os-1', valorTotal });

describe('Orcamento entity', () => {
    describe('create()', () => {
        it('creates with GERADO status and correct valorTotal', () => {
            const orc = baseOrcamento(300);
            expect(orc.status).toBe(StatusOrcamento.GERADO);
            expect(orc.valorTotal).toBe(300);
            expect(orc.osId).toBe('os-1');
            expect(orc.id).toBeDefined();
            expect(orc.dataGeracao).toBeInstanceOf(Date);
            expect(orc.dataEnvio).toBeUndefined();
            expect(orc.dataResposta).toBeUndefined();
        });

        it('throws when valorTotal is negative', () => {
            expect(() => Orcamento.create({ osId: 'os-1', valorTotal: -1 })).toThrow('negativo');
        });

        it('accepts observacoes', () => {
            const orc = Orcamento.create({ osId: 'os-1', valorTotal: 100, observacoes: 'OK' });
            expect(orc.observacoes).toBe('OK');
        });
    });

    describe('restore()', () => {
        it('restores with given id and status', () => {
            const date = new Date('2024-01-01');
            const orc = Orcamento.restore({
                id: 'orc-1', osId: 'os-1', status: StatusOrcamento.ENVIADO,
                valorTotal: 200, dataGeracao: date, createdAt: date, updatedAt: date,
            });
            expect(orc.id).toBe('orc-1');
            expect(orc.status).toBe(StatusOrcamento.ENVIADO);
        });
    });

    describe('enviar()', () => {
        it('transitions GERADO → ENVIADO and sets dataEnvio', () => {
            const orc = baseOrcamento().enviar();
            expect(orc.status).toBe(StatusOrcamento.ENVIADO);
            expect(orc.dataEnvio).toBeInstanceOf(Date);
        });

        it('throws OrcamentoTransitionError when not GERADO', () => {
            expect(() => baseOrcamento().enviar().enviar()).toThrow(OrcamentoTransitionError);
        });
    });

    describe('aprovar()', () => {
        it('transitions ENVIADO → APROVADO', () => {
            const orc = baseOrcamento().enviar().aprovar();
            expect(orc.status).toBe(StatusOrcamento.APROVADO);
            expect(orc.dataResposta).toBeInstanceOf(Date);
        });

        it('transitions GERADO → APROVADO (direct approval)', () => {
            const orc = baseOrcamento().aprovar();
            expect(orc.status).toBe(StatusOrcamento.APROVADO);
        });

        it('throws OrcamentoTransitionError when already APROVADO', () => {
            expect(() => baseOrcamento().aprovar().aprovar()).toThrow(OrcamentoTransitionError);
        });
    });

    describe('reprovar()', () => {
        it('transitions ENVIADO → REPROVADO', () => {
            const orc = baseOrcamento().enviar().reprovar('Muito caro');
            expect(orc.status).toBe(StatusOrcamento.REPROVADO);
            expect(orc.observacoes).toBe('Muito caro');
            expect(orc.dataResposta).toBeInstanceOf(Date);
        });

        it('transitions GERADO → REPROVADO (direct rejection)', () => {
            const orc = baseOrcamento().reprovar();
            expect(orc.status).toBe(StatusOrcamento.REPROVADO);
        });

        it('throws OrcamentoTransitionError when already REPROVADO', () => {
            expect(() => baseOrcamento().reprovar().reprovar()).toThrow(OrcamentoTransitionError);
        });
    });

    describe('full flows', () => {
        it('GERADO → ENVIADO → APROVADO', () => {
            const orc = baseOrcamento().enviar().aprovar();
            expect(orc.status).toBe(StatusOrcamento.APROVADO);
        });

        it('GERADO → ENVIADO → REPROVADO', () => {
            const orc = baseOrcamento().enviar().reprovar();
            expect(orc.status).toBe(StatusOrcamento.REPROVADO);
        });
    });
});
