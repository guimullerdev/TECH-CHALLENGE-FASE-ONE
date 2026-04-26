export class Email {
    private constructor(private readonly value: string) {}

    static create(raw: string): Email {
        if (!raw || !raw.includes('@') || raw.indexOf('@') === 0 || raw.lastIndexOf('.') < raw.indexOf('@')) {
            throw new Error(`Email inválido: ${raw}`);
        }
        return new Email(raw.toLowerCase().trim());
    }

    static restore(raw: string): Email {
        return new Email(raw);
    }

    getValue(): string { return this.value; }

    equals(other: Email): boolean { return this.value === other.value; }
}
