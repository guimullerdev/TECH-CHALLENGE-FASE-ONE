import { HistoricoStatusOS } from './historico-status-os.entity';

describe('HistoricoStatusOS', () => {
    describe('create()', () => {
        it('creates first transition (null anterior)', () => {
            const h = HistoricoStatusOS.create({ statusAnterior: null, statusNovo: 'RECEBIDA' });
            expect(h.statusAnterior).toBeNull();
            expect(h.statusNovo).toBe('RECEBIDA');
            expect(h.id).toBeTruthy();
            expect(h.data).toBeInstanceOf(Date);
        });

        it('creates with previous status', () => {
            const h = HistoricoStatusOS.create({ statusAnterior: 'RECEBIDA', statusNovo: 'EM_ANDAMENTO' });
            expect(h.statusAnterior).toBe('RECEBIDA');
            expect(h.statusNovo).toBe('EM_ANDAMENTO');
        });
    });

    describe('restore()', () => {
        it('restores without validation', () => {
            const date = new Date('2024-01-01');
            const h = HistoricoStatusOS.restore({ id: 'h1', statusAnterior: null, statusNovo: 'RECEBIDA', data: date });
            expect(h.id).toBe('h1');
            expect(h.data).toBe(date);
        });
    });
});
