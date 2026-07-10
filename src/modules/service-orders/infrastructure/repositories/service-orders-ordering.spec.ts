import { OrdemDeServico, StatusOS } from '../../domain/entities/service-orders.entity';

function makeOs(status: StatusOS, dataAbertura: Date, arquivada = false): OrdemDeServico {
    return OrdemDeServico.restore({
        id: crypto.randomUUID(),
        numero: 'OS-TEST',
        clienteId: 'c-1',
        veiculoId: 'v-1',
        status,
        arquivada,
        servicos: [],
        pecas: [],
        historicoStatus: [],
        dataAbertura,
        createdAt: dataAbertura,
        updatedAt: dataAbertura,
    });
}

const STATUS_PRIORITY: Partial<Record<StatusOS, number>> = {
    [StatusOS.EM_EXECUCAO]: 1,
    [StatusOS.AGUARDANDO_APROVACAO]: 2,
    [StatusOS.EM_DIAGNOSTICO]: 3,
    [StatusOS.RECEBIDA]: 4,
};

function byStatusPriorityThenOldest(a: OrdemDeServico, b: OrdemDeServico): number {
    const pa = STATUS_PRIORITY[a.status] ?? 99;
    const pb = STATUS_PRIORITY[b.status] ?? 99;
    if (pa !== pb) return pa - pb;
    return a.dataAbertura.getTime() - b.dataAbertura.getTime();
}

const d = (offset: number) => new Date(2024, 0, offset);

describe('OS listing — status priority ordering', () => {
    it('orders by priority: EM_EXECUCAO > AGUARDANDO_APROVACAO > EM_DIAGNOSTICO > RECEBIDA', () => {
        const list = [
            makeOs(StatusOS.RECEBIDA, d(1)),
            makeOs(StatusOS.EM_DIAGNOSTICO, d(1)),
            makeOs(StatusOS.AGUARDANDO_APROVACAO, d(1)),
            makeOs(StatusOS.EM_EXECUCAO, d(1)),
        ].sort(byStatusPriorityThenOldest);

        expect(list.map(o => o.status)).toEqual([
            StatusOS.EM_EXECUCAO,
            StatusOS.AGUARDANDO_APROVACAO,
            StatusOS.EM_DIAGNOSTICO,
            StatusOS.RECEBIDA,
        ]);
    });

    it('within the same status, orders oldest first', () => {
        const list = [
            makeOs(StatusOS.RECEBIDA, d(3)),
            makeOs(StatusOS.RECEBIDA, d(1)),
            makeOs(StatusOS.RECEBIDA, d(2)),
        ].sort(byStatusPriorityThenOldest);

        expect(list.map(o => o.dataAbertura)).toEqual([d(1), d(2), d(3)]);
    });

    it('applies both rules together correctly', () => {
        const list = [
            makeOs(StatusOS.RECEBIDA, d(5)),
            makeOs(StatusOS.EM_EXECUCAO, d(3)),
            makeOs(StatusOS.RECEBIDA, d(1)),
            makeOs(StatusOS.AGUARDANDO_APROVACAO, d(4)),
            makeOs(StatusOS.EM_EXECUCAO, d(2)),
            makeOs(StatusOS.EM_DIAGNOSTICO, d(6)),
        ].sort(byStatusPriorityThenOldest);

        expect(list.map(o => ({ status: o.status, day: o.dataAbertura.getDate() }))).toEqual([
            { status: StatusOS.EM_EXECUCAO, day: 2 },
            { status: StatusOS.EM_EXECUCAO, day: 3 },
            { status: StatusOS.AGUARDANDO_APROVACAO, day: 4 },
            { status: StatusOS.EM_DIAGNOSTICO, day: 6 },
            { status: StatusOS.RECEBIDA, day: 1 },
            { status: StatusOS.RECEBIDA, day: 5 },
        ]);
    });

    it('places APROVADA, REPROVADA after the four primary statuses', () => {
        const list = [
            makeOs(StatusOS.APROVADA, d(1)),
            makeOs(StatusOS.RECEBIDA, d(2)),
        ].sort(byStatusPriorityThenOldest);

        expect(list[0].status).toBe(StatusOS.RECEBIDA);
        expect(list[1].status).toBe(StatusOS.APROVADA);
    });
});

describe('OS listing — arquivada filter', () => {
    it('finalizarExecucao() sets arquivada=true', () => {
        const os = makeOs(StatusOS.EM_EXECUCAO, d(1));
        const finalizada = os.finalizarExecucao();
        expect(finalizada.arquivada).toBe(true);
        expect(finalizada.status).toBe(StatusOS.FINALIZADA);
    });

    it('entregar() sets arquivada=true', () => {
        const os = makeOs(StatusOS.FINALIZADA, d(1));
        const entregue = os.entregar();
        expect(entregue.arquivada).toBe(true);
        expect(entregue.status).toBe(StatusOS.ENTREGUE);
    });

    it('non-terminal statuses have arquivada=false by default', () => {
        const statuses = [StatusOS.RECEBIDA, StatusOS.EM_DIAGNOSTICO, StatusOS.AGUARDANDO_APROVACAO, StatusOS.APROVADA, StatusOS.EM_EXECUCAO];
        statuses.forEach(status => {
            expect(makeOs(status, d(1)).arquivada).toBe(false);
        });
    });
});
