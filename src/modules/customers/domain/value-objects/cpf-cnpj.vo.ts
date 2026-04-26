export class CpfCnpj {
    private constructor(private readonly value: string) {}

    static create(raw: string): CpfCnpj {
        const digits = raw.replace(/\D/g, '');
        if (digits.length === 11) {
            if (!CpfCnpj.validarCpf(digits)) throw new Error(`CPF inválido: ${raw}`);
        } else if (digits.length === 14) {
            if (!CpfCnpj.validarCnpj(digits)) throw new Error(`CNPJ inválido: ${raw}`);
        } else {
            throw new Error('CPF deve ter 11 dígitos e CNPJ 14 dígitos');
        }
        return new CpfCnpj(digits);
    }

    static restore(raw: string): CpfCnpj {
        return new CpfCnpj(raw.replace(/\D/g, ''));
    }

    getValue(): string { return this.value; }

    equals(other: CpfCnpj): boolean { return this.value === other.value; }

    private static validarCpf(digits: string): boolean {
        if (/^(\d)\1{10}$/.test(digits)) return false;
        const calc = (mod: number) => {
            let sum = 0;
            for (let i = 0; i < mod - 1; i++) sum += parseInt(digits[i]) * (mod - i);
            const rest = (sum * 10) % 11;
            return rest === 10 || rest === 11 ? 0 : rest;
        };
        return calc(10) === parseInt(digits[9]) && calc(11) === parseInt(digits[10]);
    }

    private static validarCnpj(digits: string): boolean {
        if (/^(\d)\1{13}$/.test(digits)) return false;
        const calc = (weights: number[]) => {
            let sum = 0;
            for (let i = 0; i < weights.length; i++) sum += parseInt(digits[i]) * weights[i];
            const rest = sum % 11;
            return rest < 2 ? 0 : 11 - rest;
        };
        const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        return calc(w1) === parseInt(digits[12]) && calc(w2) === parseInt(digits[13]);
    }
}
