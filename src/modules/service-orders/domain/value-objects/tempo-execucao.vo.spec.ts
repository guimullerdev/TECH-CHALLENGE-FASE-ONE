import { TempoExecucao } from './tempo-execucao.vo';

const inicio = new Date('2024-01-01T08:00:00Z');
const fim = new Date('2024-01-01T10:00:00Z'); // 2h depois

describe('TempoExecucao', () => {
    describe('create()', () => {
        it('creates with valid dates', () => {
            const t = TempoExecucao.create(inicio, fim);
            expect(t.getInicio()).toEqual(inicio);
            expect(t.getFim()).toEqual(fim);
        });

        it('throws when fim <= inicio', () => {
            expect(() => TempoExecucao.create(fim, inicio)).toThrow('posterior');
        });

        it('throws when fim equals inicio', () => {
            expect(() => TempoExecucao.create(inicio, inicio)).toThrow('posterior');
        });

        it('throws when inicio is invalid Date', () => {
            expect(() => TempoExecucao.create(new Date('invalid'), fim)).toThrow('início');
        });

        it('throws when fim is invalid Date', () => {
            expect(() => TempoExecucao.create(inicio, new Date('invalid'))).toThrow('fim');
        });
    });

    describe('restore()', () => {
        it('restores without validation', () => {
            const t = TempoExecucao.restore(inicio, fim);
            expect(t.getInicio()).toEqual(inicio);
            expect(t.getFim()).toEqual(fim);
        });
    });

    describe('getDuracaoEmMinutos()', () => {
        it('calculates duration in minutes', () => {
            const t = TempoExecucao.create(inicio, fim);
            expect(t.getDuracaoEmMinutos()).toBe(120);
        });
    });

    describe('getDuracaoEmHoras()', () => {
        it('calculates duration in hours', () => {
            const t = TempoExecucao.create(inicio, fim);
            expect(t.getDuracaoEmHoras()).toBe(2);
        });
    });

    describe('equals()', () => {
        it('returns true for same dates', () => {
            const a = TempoExecucao.create(inicio, fim);
            const b = TempoExecucao.create(new Date(inicio), new Date(fim));
            expect(a.equals(b)).toBe(true);
        });

        it('returns false for different dates', () => {
            const a = TempoExecucao.create(inicio, fim);
            const b = TempoExecucao.create(inicio, new Date('2024-01-01T11:00:00Z'));
            expect(a.equals(b)).toBe(false);
        });
    });
});
