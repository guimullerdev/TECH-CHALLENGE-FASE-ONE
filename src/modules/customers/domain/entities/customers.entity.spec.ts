import { Cliente } from './customers.entity';

describe('Cliente entity', () => {
    describe('create()', () => {
        it('creates a cliente with correct properties', () => {
            const c = Cliente.create({ nome: 'João', cpf: '12345678901', telefone: '11999990000' });
            expect(c.nome).toBe('João');
            expect(c.cpf).toBe('12345678901');
            expect(c.id).toBeDefined();
            expect(c.ativo).toBe(true);
            expect(c.createdAt).toBeInstanceOf(Date);
        });

        it('throws when email is invalid', () => {
            expect(() =>
                Cliente.create({ nome: 'João', cpf: '123', telefone: '999', email: 'invalid-email' }),
            ).toThrow('Email');
        });

        it('accepts optional fields', () => {
            const c = Cliente.create({ nome: 'Ana', cpf: '00000000000', email: 'ana@email.com', endereco: 'Rua X' });
            expect(c.email).toBe('ana@email.com');
            expect(c.endereco).toBe('Rua X');
        });
    });

    describe('restore()', () => {
        it('restores with a given id and createdAt', () => {
            const date = new Date('2024-01-01');
            const c = Cliente.restore({
                id: 'c-1', nome: 'X', cpf: '111', ativo: true, createdAt: date, updatedAt: date,
            });
            expect(c.id).toBe('c-1');
            expect(c.createdAt).toEqual(date);
        });
    });

    describe('update()', () => {
        it('updates fields partially', () => {
            const c = Cliente.create({ nome: 'Old', cpf: '111', telefone: '000' });
            const updated = c.update({ nome: 'New', telefone: '999' });
            expect(updated.nome).toBe('New');
            expect(updated.telefone).toBe('999');
            expect(updated.cpf).toBe('111');
        });

        it('throws when updated email is invalid', () => {
            const c = Cliente.create({ nome: 'X', cpf: '111' });
            expect(() => c.update({ email: 'bad-email' })).toThrow('Email');
        });

        it('keeps the same id and createdAt', () => {
            const c = Cliente.create({ nome: 'X', cpf: '111' });
            const updated = c.update({ nome: 'Y' });
            expect(updated.id).toBe(c.id);
            expect(updated.createdAt).toEqual(c.createdAt);
        });
    });

    describe('deactivate()', () => {
        it('sets ativo to false', () => {
            const c = Cliente.create({ nome: 'X', cpf: '111' });
            expect(c.deactivate().ativo).toBe(false);
        });

        it('preserves id and cpf', () => {
            const c = Cliente.create({ nome: 'X', cpf: '111' });
            const deactivated = c.deactivate();
            expect(deactivated.id).toBe(c.id);
            expect(deactivated.cpf).toBe('111');
        });
    });

    describe('reactivate()', () => {
        it('sets ativo back to true', () => {
            const c = Cliente.create({ nome: 'X', cpf: '111' }).deactivate();
            expect(c.reactivate().ativo).toBe(true);
        });
    });
});
