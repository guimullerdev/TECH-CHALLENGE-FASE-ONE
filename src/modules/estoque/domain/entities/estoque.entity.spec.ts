import { Estoque } from './estoque.entity';

describe('Estoque', () => {
    describe('create()', () => {
        it('creates with zero quantity by default', () => {
            const e = Estoque.create({ pecaId: 'p1' });
            expect(e.quantidadeDisponivel).toBe(0);
            expect(e.quantidadeReservada).toBe(0);
            expect(e.quantidadeTotal).toBe(0);
        });

        it('creates with initial quantity', () => {
            const e = Estoque.create({ pecaId: 'p1', quantidadeInicial: 10 });
            expect(e.quantidadeDisponivel).toBe(10);
        });
    });

    describe('restore()', () => {
        it('restores state', () => {
            const date = new Date();
            const e = Estoque.restore({ id: 'e1', pecaId: 'p1', quantidadeDisponivel: 5, quantidadeReservada: 2, updatedAt: date });
            expect(e.id).toBe('e1');
            expect(e.quantidadeDisponivel).toBe(5);
            expect(e.quantidadeReservada).toBe(2);
            expect(e.quantidadeTotal).toBe(7);
        });
    });

    describe('reservar()', () => {
        it('moves quantity from disponivel to reservada', () => {
            const e = Estoque.create({ pecaId: 'p1', quantidadeInicial: 10 });
            const updated = e.reservar(3);
            expect(updated.quantidadeDisponivel).toBe(7);
            expect(updated.quantidadeReservada).toBe(3);
        });

        it('throws when insufficient stock', () => {
            const e = Estoque.create({ pecaId: 'p1', quantidadeInicial: 2 });
            expect(() => e.reservar(5)).toThrow('insuficiente');
        });
    });

    describe('liberarReserva()', () => {
        it('moves quantity back from reservada to disponivel', () => {
            const e = Estoque.restore({ id: 'e1', pecaId: 'p1', quantidadeDisponivel: 7, quantidadeReservada: 3, updatedAt: new Date() });
            const updated = e.liberarReserva(2);
            expect(updated.quantidadeDisponivel).toBe(9);
            expect(updated.quantidadeReservada).toBe(1);
        });
    });

    describe('darBaixa()', () => {
        it('reduces reservada without affecting disponivel', () => {
            const e = Estoque.restore({ id: 'e1', pecaId: 'p1', quantidadeDisponivel: 7, quantidadeReservada: 3, updatedAt: new Date() });
            const updated = e.darBaixa(3);
            expect(updated.quantidadeDisponivel).toBe(7);
            expect(updated.quantidadeReservada).toBe(0);
        });
    });

    describe('entrada()', () => {
        it('increases disponivel', () => {
            const e = Estoque.create({ pecaId: 'p1', quantidadeInicial: 5 });
            const updated = e.entrada(10);
            expect(updated.quantidadeDisponivel).toBe(15);
            expect(updated.quantidadeReservada).toBe(0);
        });
    });
});
