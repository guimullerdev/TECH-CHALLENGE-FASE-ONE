import { CpfCnpj } from './cpf-cnpj.vo';

describe('CpfCnpj', () => {
    describe('create() - CPF', () => {
        it('accepts valid CPF digits', () => {
            const vo = CpfCnpj.create('52998224725');
            expect(vo.getValue()).toBe('52998224725');
        });

        it('accepts valid CPF with formatting', () => {
            const vo = CpfCnpj.create('529.982.247-25');
            expect(vo.getValue()).toBe('52998224725');
        });

        it('throws for CPF with all same digits', () => {
            expect(() => CpfCnpj.create('11111111111')).toThrow('CPF');
        });

        it('throws for CPF with invalid check digits', () => {
            expect(() => CpfCnpj.create('12345678901')).toThrow('CPF');
        });

        it('throws for wrong length', () => {
            expect(() => CpfCnpj.create('123')).toThrow('dígitos');
        });
    });

    describe('create() - CNPJ', () => {
        it('accepts valid CNPJ', () => {
            const vo = CpfCnpj.create('11222333000181');
            expect(vo.getValue()).toBe('11222333000181');
        });

        it('throws for CNPJ with all same digits', () => {
            expect(() => CpfCnpj.create('11111111111111')).toThrow('CNPJ');
        });

        it('throws for CNPJ with invalid check digits', () => {
            expect(() => CpfCnpj.create('11222333000100')).toThrow('CNPJ');
        });
    });

    describe('restore()', () => {
        it('restores without validation, strips formatting', () => {
            const vo = CpfCnpj.restore('111.111.111-11');
            expect(vo.getValue()).toBe('11111111111');
        });
    });

    describe('equals()', () => {
        it('returns true for same CPF', () => {
            const a = CpfCnpj.restore('52998224725');
            const b = CpfCnpj.restore('52998224725');
            expect(a.equals(b)).toBe(true);
        });

        it('returns false for different CPFs', () => {
            expect(CpfCnpj.restore('111').equals(CpfCnpj.restore('222'))).toBe(false);
        });
    });
});
