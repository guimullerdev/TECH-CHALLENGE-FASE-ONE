import { Peca } from './parts.entity';

describe('Peca entity', () => {
    describe('create()', () => {
        it('creates a peca with correct properties', () => {
            const p = Peca.create({ nome: 'Filtro de óleo', precoUnitario: 45.9, qtdTotal: 10 });
            expect(p.nome).toBe('Filtro de óleo');
            expect(p.precoUnitario).toBe(45.9);
            expect(p.qtdTotal).toBe(10);
            expect(p.qtdDisponivel).toBe(10);
            expect(p.qtdReservada).toBe(0);
            expect(p.id).toBeDefined();
            expect(p.ativo).toBe(true);
        });

        it('accepts optional codigo and descricao', () => {
            const p = Peca.create({ nome: 'Filtro', precoUnitario: 10, codigo: 'FLT-001', descricao: 'Desc' });
            expect(p.codigo).toBe('FLT-001');
            expect(p.descricao).toBe('Desc');
        });

        it('throws when precoUnitario is negative', () => {
            expect(() => Peca.create({ nome: 'X', precoUnitario: -1 })).toThrow('negativo');
        });

        it('throws when qtdTotal is negative', () => {
            expect(() => Peca.create({ nome: 'X', precoUnitario: 10, qtdTotal: -1 })).toThrow('negativa');
        });

        it('accepts precoUnitario = 0 and qtdTotal = 0', () => {
            const p = Peca.create({ nome: 'X', precoUnitario: 0, qtdTotal: 0 });
            expect(p.precoUnitario).toBe(0);
            expect(p.qtdTotal).toBe(0);
        });
    });

    describe('restore()', () => {
        it('restores with a given id', () => {
            const date = new Date();
            const p = Peca.restore({ id: 'abc', nome: 'Filtro', precoUnitario: 10, qtdTotal: 5, qtdDisponivel: 3, qtdReservada: 2, ativo: true, createdAt: date, updatedAt: date });
            expect(p.id).toBe('abc');
            expect(p.qtdReservada).toBe(2);
        });
    });

    describe('update()', () => {
        it('updates nome partially', () => {
            const p = Peca.create({ nome: 'Old', precoUnitario: 10, qtdTotal: 5 });
            const updated = p.update({ nome: 'New' });
            expect(updated.nome).toBe('New');
            expect(updated.precoUnitario).toBe(10);
        });

        it('throws when updated precoUnitario is negative', () => {
            const p = Peca.create({ nome: 'X', precoUnitario: 10, qtdTotal: 5 });
            expect(() => p.update({ precoUnitario: -5 })).toThrow('negativo');
        });

        it('keeps stock quantities unchanged', () => {
            const p = Peca.create({ nome: 'X', precoUnitario: 10, qtdTotal: 5 });
            const updated = p.update({ precoUnitario: 20 });
            expect(updated.qtdTotal).toBe(5);
            expect(updated.qtdDisponivel).toBe(5);
            expect(updated.qtdReservada).toBe(0);
        });
    });

    describe('deactivate()', () => {
        it('sets ativo to false', () => {
            const p = Peca.create({ nome: 'X', precoUnitario: 10 });
            expect(p.deactivate().ativo).toBe(false);
        });
    });

    describe('reactivate()', () => {
        it('sets ativo back to true', () => {
            const p = Peca.create({ nome: 'X', precoUnitario: 10 }).deactivate();
            expect(p.reactivate().ativo).toBe(true);
        });
    });
});
