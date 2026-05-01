import { Cliente } from './customers.entity';

const VALID_CPF = '52998224725';
const VALID_CNPJ = '11222333000181';
const VALID_PHONE = '11999990000';

describe('Cliente entity', () => {
    describe('create()', () => {
        it('creates a cliente with CPF', () => {
            const c = Cliente.create({ nome: 'João', documento: VALID_CPF, telefone: VALID_PHONE });
            expect(c.nome).toBe('João');
            expect(c.documento).toBe(VALID_CPF);
            expect(c.tipoDocumento).toBe('CPF');
            expect(c.id).toBeDefined();
            expect(c.ativo).toBe(true);
            expect(c.createdAt).toBeInstanceOf(Date);
        });

        it('creates a cliente with CNPJ', () => {
            const c = Cliente.create({ nome: 'Empresa', documento: VALID_CNPJ });
            expect(c.documento).toBe(VALID_CNPJ);
            expect(c.tipoDocumento).toBe('CNPJ');
        });

        it('throws when email is invalid', () => {
            expect(() =>
                Cliente.create({ nome: 'João', documento: VALID_CPF, telefone: VALID_PHONE, email: 'invalid-email' }),
            ).toThrow('Email');
        });

        it('accepts optional fields', () => {
            const c = Cliente.create({ nome: 'Ana', documento: VALID_CPF, email: 'ana@email.com', endereco: 'Rua X' });
            expect(c.email).toBe('ana@email.com');
            expect(c.endereco).toBe('Rua X');
        });

        it('throws when CPF has wrong length', () => {
            expect(() => Cliente.create({ nome: 'X', documento: '123' })).toThrow();
        });

        it('throws when CPF digits are invalid', () => {
            expect(() => Cliente.create({ nome: 'X', documento: '12345678901' })).toThrow('CPF');
        });
    });

    describe('restore()', () => {
        it('restores with a given id and createdAt (bypasses validation)', () => {
            const date = new Date('2024-01-01');
            const c = Cliente.restore({
                id: 'c-1', nome: 'X', documento: '111', ativo: true, createdAt: date, updatedAt: date,
            });
            expect(c.id).toBe('c-1');
            expect(c.createdAt).toEqual(date);
        });
    });

    describe('update()', () => {
        it('updates fields partially', () => {
            const c = Cliente.restore({ id: 'c-1', nome: 'Old', documento: '111', ativo: true, createdAt: new Date(), updatedAt: new Date(), telefone: VALID_PHONE });
            const updated = c.update({ nome: 'New', telefone: '11988887777' });
            expect(updated.nome).toBe('New');
            expect(updated.telefone).toBe('11988887777');
            expect(updated.documento).toBe('111');
        });

        it('throws when updated email is invalid', () => {
            const c = Cliente.restore({ id: 'c-1', nome: 'X', documento: '111', ativo: true, createdAt: new Date(), updatedAt: new Date() });
            expect(() => c.update({ email: 'bad-email' })).toThrow('Email');
        });

        it('keeps the same id and createdAt', () => {
            const c = Cliente.restore({ id: 'c-1', nome: 'X', documento: '111', ativo: true, createdAt: new Date('2024-01-01'), updatedAt: new Date() });
            const updated = c.update({ nome: 'Y' });
            expect(updated.id).toBe(c.id);
            expect(updated.createdAt).toEqual(c.createdAt);
        });

        it('keeps nome and endereco unchanged when not provided', () => {
            const c = Cliente.restore({ id: 'c-1', nome: 'Original', documento: '111', ativo: true, createdAt: new Date(), updatedAt: new Date(), endereco: 'Rua A' });
            const updated = c.update({ telefone: '11988887777' });
            expect(updated.nome).toBe('Original');
            expect(updated.endereco).toBe('Rua A');
        });
    });

    describe('deactivate()', () => {
        it('sets ativo to false', () => {
            const c = Cliente.restore({ id: 'c-1', nome: 'X', documento: '111', ativo: true, createdAt: new Date(), updatedAt: new Date() });
            expect(c.deactivate().ativo).toBe(false);
        });

        it('preserves id and documento', () => {
            const c = Cliente.restore({ id: 'c-1', nome: 'X', documento: '111', ativo: true, createdAt: new Date(), updatedAt: new Date() });
            const deactivated = c.deactivate();
            expect(deactivated.id).toBe(c.id);
            expect(deactivated.documento).toBe('111');
        });
    });

    describe('reactivate()', () => {
        it('sets ativo back to true', () => {
            const c = Cliente.restore({ id: 'c-1', nome: 'X', documento: '111', ativo: false, createdAt: new Date(), updatedAt: new Date() });
            expect(c.reactivate().ativo).toBe(true);
        });
    });
});
