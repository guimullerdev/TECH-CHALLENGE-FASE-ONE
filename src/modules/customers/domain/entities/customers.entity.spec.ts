import { Customer } from './customers.entity';

describe('Customer entity', () => {
    describe('create()', () => {
        it('creates a customer with correct properties', () => {
            const c = Customer.create({ name: 'João', email: 'joao@email.com', document: '12345678901', phone: '11999990000' });
            expect(c.name).toBe('João');
            expect(c.email).toBe('joao@email.com');
            expect(c.id).toBeDefined();
            expect(c.createdAt).toBeInstanceOf(Date);
        });

        it('throws when email is invalid', () => {
            expect(() =>
                Customer.create({ name: 'João', email: 'invalid-email', document: '123', phone: '999' }),
            ).toThrow('Email');
        });
    });

    describe('restore()', () => {
        it('restores with a given id and createdAt', () => {
            const date = new Date('2024-01-01');
            const c = Customer.restore({ id: 'c-1', name: 'X', email: 'x@x.com', document: '111', phone: '999', createdAt: date });
            expect(c.id).toBe('c-1');
            expect(c.createdAt).toEqual(date);
        });
    });

    describe('update()', () => {
        it('updates fields partially', () => {
            const c = Customer.create({ name: 'Old', email: 'old@email.com', document: '111', phone: '000' });
            const updated = c.update({ name: 'New', phone: '999' });
            expect(updated.name).toBe('New');
            expect(updated.phone).toBe('999');
            expect(updated.email).toBe('old@email.com');
        });

        it('throws when updated email is invalid', () => {
            const c = Customer.create({ name: 'X', email: 'x@x.com', document: '111', phone: '000' });
            expect(() => c.update({ email: 'bad-email' })).toThrow('Email');
        });

        it('keeps the same id and createdAt', () => {
            const c = Customer.create({ name: 'X', email: 'x@x.com', document: '111', phone: '000' });
            const updated = c.update({ name: 'Y' });
            expect(updated.id).toBe(c.id);
            expect(updated.createdAt).toEqual(c.createdAt);
        });
    });
});
