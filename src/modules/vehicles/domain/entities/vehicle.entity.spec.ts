import { Veiculo } from './vehicle.entity';

describe('Veiculo entity', () => {
    describe('create()', () => {
        it('creates a veiculo with placa uppercased (Mercosul)', () => {
            const v = Veiculo.create({ placa: 'abc1d23', marca: 'Toyota', modelo: 'Corolla', clienteId: 'c1' });
            expect(v.placa).toBe('ABC1D23');
            expect(v.id).toBeDefined();
            expect(v.ativo).toBe(true);
        });

        it('creates a veiculo with old plate format', () => {
            const v = Veiculo.create({ placa: 'ABC1234', marca: 'Honda', modelo: 'Civic', clienteId: 'c1' });
            expect(v.placa).toBe('ABC1234');
        });

        it('throws when placa format is invalid', () => {
            expect(() =>
                Veiculo.create({ placa: 'INVALID', marca: 'X', modelo: 'Y', clienteId: 'c1' }),
            ).toThrow('Placa');
        });

        it('throws when ano < 1886', () => {
            expect(() =>
                Veiculo.create({ placa: 'ABC1D23', marca: 'X', modelo: 'Y', clienteId: 'c1', ano: 1885 }),
            ).toThrow('inválido');
        });

        it('throws when ano > current year + 1', () => {
            const futureYear = new Date().getFullYear() + 2;
            expect(() =>
                Veiculo.create({ placa: 'ABC1D23', marca: 'X', modelo: 'Y', clienteId: 'c1', ano: futureYear }),
            ).toThrow('inválido');
        });

        it('accepts current year', () => {
            const ano = new Date().getFullYear();
            const v = Veiculo.create({ placa: 'XYZ1234', marca: 'Honda', modelo: 'Civic', clienteId: 'c1', ano });
            expect(v.ano).toBe(ano);
        });

        it('accepts optional cor and kmAtual', () => {
            const v = Veiculo.create({ placa: 'ABC1234', marca: 'Ford', modelo: 'Ka', clienteId: 'c1', cor: 'Branco', kmAtual: 50000 });
            expect(v.cor).toBe('Branco');
            expect(v.kmAtual).toBe(50000);
        });
    });

    describe('restore()', () => {
        it('restores with a given id', () => {
            const date = new Date();
            const v = Veiculo.restore({ id: 'v-1', placa: 'ABC1D23', marca: 'X', modelo: 'Y', clienteId: 'c1', ativo: true, createdAt: date, updatedAt: date });
            expect(v.id).toBe('v-1');
        });
    });

    describe('update()', () => {
        it('updates marca and modelo but placa is immutable', () => {
            const v = Veiculo.create({ placa: 'ABC1D23', marca: 'Old', modelo: 'OldM', clienteId: 'c1' });
            const updated = v.update({ marca: 'New', modelo: 'NewM' });
            expect(updated.marca).toBe('New');
            expect(updated.modelo).toBe('NewM');
            expect(updated.placa).toBe('ABC1D23');
        });

        it('throws on invalid ano in update', () => {
            const v = Veiculo.create({ placa: 'ABC1D23', marca: 'X', modelo: 'Y', clienteId: 'c1' });
            expect(() => v.update({ ano: 1800 })).toThrow('inválido');
        });
    });

    describe('deactivate()', () => {
        it('sets ativo to false', () => {
            const v = Veiculo.create({ placa: 'ABC1234', marca: 'X', modelo: 'Y', clienteId: 'c1' });
            expect(v.deactivate().ativo).toBe(false);
        });
    });

    describe('reactivate()', () => {
        it('sets ativo back to true', () => {
            const v = Veiculo.create({ placa: 'ABC1234', marca: 'X', modelo: 'Y', clienteId: 'c1' }).deactivate();
            expect(v.reactivate().ativo).toBe(true);
        });
    });
});
