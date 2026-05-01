import { Servico } from './services.entity';

describe('Servico entity', () => {
    describe('create()', () => {
        it('creates a servico with correct properties', () => {
            const s = Servico.create({ nome: 'Troca de óleo', precoBase: 150 });
            expect(s.nome).toBe('Troca de óleo');
            expect(s.precoBase).toBe(150);
            expect(s.id).toBeDefined();
            expect(s.ativo).toBe(true);
        });

        it('accepts optional descricao', () => {
            const s = Servico.create({ nome: 'X', precoBase: 10, descricao: 'Desc' });
            expect(s.descricao).toBe('Desc');
        });

        it('throws when precoBase is negative', () => {
            expect(() => Servico.create({ nome: 'X', precoBase: -1 })).toThrow('negativo');
        });

        it('accepts precoBase = 0', () => {
            const s = Servico.create({ nome: 'X', precoBase: 0 });
            expect(s.precoBase).toBe(0);
        });
    });

    describe('restore()', () => {
        it('restores with a given id', () => {
            const date = new Date();
            const s = Servico.restore({ id: 'svc-1', nome: 'X', precoBase: 10, ativo: true, createdAt: date, updatedAt: date });
            expect(s.id).toBe('svc-1');
        });
    });

    describe('update()', () => {
        it('updates fields partially', () => {
            const s = Servico.create({ nome: 'Old', precoBase: 100 });
            const updated = s.update({ nome: 'New', precoBase: 200 });
            expect(updated.nome).toBe('New');
            expect(updated.precoBase).toBe(200);
        });

        it('throws when updated precoBase is negative', () => {
            const s = Servico.create({ nome: 'X', precoBase: 10 });
            expect(() => s.update({ precoBase: -1 })).toThrow('negativo');
        });

        it('keeps nome and precoBase when not provided', () => {
            const s = Servico.create({ nome: 'OldName', precoBase: 150 });
            const updated = s.update({});
            expect(updated.nome).toBe('OldName');
            expect(updated.precoBase).toBe(150);
        });
    });

    describe('deactivate()', () => {
        it('sets ativo to false', () => {
            const s = Servico.create({ nome: 'X', precoBase: 10 });
            expect(s.deactivate().ativo).toBe(false);
        });

        it('preserves id', () => {
            const s = Servico.create({ nome: 'X', precoBase: 10 });
            expect(s.deactivate().id).toBe(s.id);
        });
    });

    describe('reactivate()', () => {
        it('sets ativo back to true', () => {
            const s = Servico.create({ nome: 'X', precoBase: 10 }).deactivate();
            expect(s.reactivate().ativo).toBe(true);
        });
    });
});
