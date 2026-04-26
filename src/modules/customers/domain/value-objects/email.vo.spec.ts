import { Email } from './email.vo';

describe('Email', () => {
    describe('create()', () => {
        it('accepts valid email', () => {
            const e = Email.create('user@example.com');
            expect(e.getValue()).toBe('user@example.com');
        });

        it('normalizes to lowercase', () => {
            const e = Email.create('User@EXAMPLE.COM');
            expect(e.getValue()).toBe('user@example.com');
        });

        it('trims whitespace', () => {
            const e = Email.create('  user@example.com  ');
            expect(e.getValue()).toBe('user@example.com');
        });

        it('throws when missing @', () => {
            expect(() => Email.create('userexample.com')).toThrow('inválido');
        });

        it('throws when @ is first character', () => {
            expect(() => Email.create('@example.com')).toThrow('inválido');
        });

        it('throws when no dot after @', () => {
            expect(() => Email.create('user@examplecom')).toThrow('inválido');
        });
    });

    describe('restore()', () => {
        it('restores without validation', () => {
            expect(Email.restore('any').getValue()).toBe('any');
        });
    });

    describe('equals()', () => {
        it('returns true for same email', () => {
            expect(Email.create('a@b.com').equals(Email.create('a@b.com'))).toBe(true);
        });

        it('returns false for different emails', () => {
            expect(Email.create('a@b.com').equals(Email.create('c@d.com'))).toBe(false);
        });
    });
});
