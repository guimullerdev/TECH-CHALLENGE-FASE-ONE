import { Diagnostico } from './diagnostico.entity';

describe('Diagnostico', () => {
    describe('create()', () => {
        it('creates with valid props', () => {
            const d = Diagnostico.create({ descricao: 'Motor com ruído', mecanicoResponsavel: 'João' });
            expect(d.descricao).toBe('Motor com ruído');
            expect(d.mecanicoResponsavel).toBe('João');
            expect(d.id).toBeTruthy();
            expect(d.data).toBeInstanceOf(Date);
        });

        it('throws when descricao is empty', () => {
            expect(() => Diagnostico.create({ descricao: '   ', mecanicoResponsavel: 'João' }))
                .toThrow('obrigatória');
        });

        it('throws when mecanicoResponsavel is empty', () => {
            expect(() => Diagnostico.create({ descricao: 'Diagnóstico', mecanicoResponsavel: '   ' }))
                .toThrow('obrigatório');
        });

        it('trims descricao and mecanicoResponsavel', () => {
            const d = Diagnostico.create({ descricao: '  Vazamento  ', mecanicoResponsavel: '  Pedro  ' });
            expect(d.descricao).toBe('Vazamento');
            expect(d.mecanicoResponsavel).toBe('Pedro');
        });
    });

    describe('restore()', () => {
        it('restores without validation', () => {
            const date = new Date('2024-01-01');
            const d = Diagnostico.restore({ id: 'abc', descricao: 'x', data: date, mecanicoResponsavel: 'M' });
            expect(d.id).toBe('abc');
            expect(d.descricao).toBe('x');
            expect(d.data).toBe(date);
            expect(d.mecanicoResponsavel).toBe('M');
        });
    });
});
