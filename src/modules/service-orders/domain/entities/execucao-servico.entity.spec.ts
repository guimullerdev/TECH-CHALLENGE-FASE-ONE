import { ExecucaoServico } from './execucao-servico.entity';

describe('ExecucaoServico', () => {
    const inicio = new Date('2024-01-01T08:00:00');
    const fim = new Date('2024-01-01T10:00:00');

    describe('create()', () => {
        it('creates with valid props', () => {
            const e = ExecucaoServico.create({ dataInicio: inicio, dataFim: fim, mecanicoResponsavel: 'João' });
            expect(e.dataInicio).toEqual(inicio);
            expect(e.dataFim).toEqual(fim);
            expect(e.duracaoEmMinutos).toBe(120);
            expect(e.mecanicoResponsavel).toBe('João');
            expect(e.id).toBeTruthy();
        });

        it('throws when mecanicoResponsavel is empty', () => {
            expect(() => ExecucaoServico.create({ dataInicio: inicio, dataFim: fim, mecanicoResponsavel: '' }))
                .toThrow('obrigatório');
        });

        it('throws when fim <= inicio', () => {
            expect(() => ExecucaoServico.create({ dataInicio: fim, dataFim: inicio, mecanicoResponsavel: 'João' }))
                .toThrow();
        });
    });

    describe('restore()', () => {
        it('restores without validation', () => {
            const e = ExecucaoServico.restore({ id: 'e1', dataInicio: inicio, dataFim: fim, mecanicoResponsavel: 'M' });
            expect(e.id).toBe('e1');
            expect(e.dataInicio).toEqual(inicio);
            expect(e.dataFim).toEqual(fim);
        });
    });
});
