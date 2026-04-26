const PLACA_ANTIGA = /^[A-Z]{3}\d{4}$/;
const PLACA_MERCOSUL = /^[A-Z]{3}\d[A-Z]\d{2}$/;

export class Placa {
    private constructor(private readonly value: string) {}

    static create(raw: string): Placa {
        const normalized = raw.toUpperCase().replace(/[-\s]/g, '');
        if (!PLACA_ANTIGA.test(normalized) && !PLACA_MERCOSUL.test(normalized)) {
            throw new Error(`Placa inválida: ${raw}. Formatos aceitos: ABC-1234 ou ABC1D23`);
        }
        return new Placa(normalized);
    }

    static restore(raw: string): Placa {
        return new Placa(raw.toUpperCase().replace(/[-\s]/g, ''));
    }

    getValue(): string { return this.value; }

    equals(other: Placa): boolean { return this.value === other.value; }
}
