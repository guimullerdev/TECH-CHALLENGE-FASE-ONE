import { Vehicle } from './vehicle.entity';

describe('Vehicle entity', () => {
    describe('create()', () => {
        it('creates a vehicle with plate uppercased', () => {
            const v = Vehicle.create({ plate: 'abc1d234', brand: 'Toyota', model: 'Corolla', year: 2020, customerId: 'c1' });
            expect(v.plate).toBe('ABC1D234');
            expect(v.id).toBeDefined();
        });

        it('throws when year < 1886', () => {
            expect(() =>
                Vehicle.create({ plate: 'ABC1D234', brand: 'X', model: 'Y', year: 1885, customerId: 'c1' }),
            ).toThrow('inválido');
        });

        it('throws when year > current year + 1', () => {
            const futureYear = new Date().getFullYear() + 2;
            expect(() =>
                Vehicle.create({ plate: 'ABC1D234', brand: 'X', model: 'Y', year: futureYear, customerId: 'c1' }),
            ).toThrow('inválido');
        });

        it('accepts current year', () => {
            const year = new Date().getFullYear();
            const v = Vehicle.create({ plate: 'XYZ1234', brand: 'Honda', model: 'Civic', year, customerId: 'c1' });
            expect(v.year).toBe(year);
        });
    });

    describe('restore()', () => {
        it('restores with a given id', () => {
            const v = Vehicle.restore({ id: 'v-1', plate: 'ABC1D234', brand: 'X', model: 'Y', year: 2020, customerId: 'c1' });
            expect(v.id).toBe('v-1');
        });
    });

    describe('update()', () => {
        it('updates brand and model but plate is immutable', () => {
            const v = Vehicle.create({ plate: 'ABC1D234', brand: 'Old', model: 'OldM', year: 2020, customerId: 'c1' });
            const updated = v.update({ brand: 'New', model: 'NewM' });
            expect(updated.brand).toBe('New');
            expect(updated.model).toBe('NewM');
            expect(updated.plate).toBe('ABC1D234');
        });

        it('throws on invalid year in update', () => {
            const v = Vehicle.create({ plate: 'ABC1D234', brand: 'X', model: 'Y', year: 2020, customerId: 'c1' });
            expect(() => v.update({ year: 1800 })).toThrow('inválido');
        });
    });
});
