import { CpfCnpj } from '../value-objects/cpf-cnpj.vo';
import { Email } from '../value-objects/email.vo';
import { Telefone } from '../value-objects/telefone.vo';

export class Cliente {
    private readonly _documento: CpfCnpj;
    private readonly _email: Email | undefined;
    private readonly _telefone: Telefone | undefined;

    private constructor(
        public readonly id: string,
        public readonly nome: string,
        documento: CpfCnpj,
        telefone: Telefone | undefined,
        email: Email | undefined,
        public readonly endereco: string | undefined,
        public readonly ativo: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {
        this._documento = documento;
        this._telefone = telefone;
        this._email = email;
    }

    get documento(): string { return this._documento.getValue(); }
    get tipoDocumento(): 'CPF' | 'CNPJ' { return this._documento.getValue().length === 11 ? 'CPF' : 'CNPJ'; }
    get telefone(): string | undefined { return this._telefone?.getValue(); }
    get email(): string | undefined { return this._email?.getValue(); }

    static create(props: {
        nome: string;
        documento: string;
        telefone?: string;
        email?: string;
        endereco?: string;
    }): Cliente {
        const documento = CpfCnpj.create(props.documento);
        const email = props.email ? Email.create(props.email) : undefined;
        const telefone = props.telefone ? Telefone.create(props.telefone) : undefined;
        return new Cliente(
            crypto.randomUUID(),
            props.nome,
            documento,
            telefone,
            email,
            props.endereco,
            true,
            new Date(),
            new Date(),
        );
    }

    static restore(props: {
        id: string;
        nome: string;
        documento: string;
        telefone?: string;
        email?: string;
        endereco?: string;
        ativo: boolean;
        createdAt: Date;
        updatedAt: Date;
    }): Cliente {
        return new Cliente(
            props.id,
            props.nome,
            CpfCnpj.restore(props.documento),
            props.telefone ? Telefone.restore(props.telefone) : undefined,
            props.email ? Email.restore(props.email) : undefined,
            props.endereco,
            props.ativo,
            props.createdAt,
            props.updatedAt,
        );
    }

    update(props: Partial<{ nome: string; telefone: string; email: string; endereco: string }>): Cliente {
        const email = props.email ? Email.create(props.email) : this._email;
        const telefone = props.telefone ? Telefone.create(props.telefone) : this._telefone;
        return new Cliente(
            this.id,
            props.nome ?? this.nome,
            this._documento,
            telefone,
            email,
            props.endereco ?? this.endereco,
            this.ativo,
            this.createdAt,
            new Date(),
        );
    }

    deactivate(): Cliente {
        return new Cliente(this.id, this.nome, this._documento, this._telefone, this._email, this.endereco, false, this.createdAt, new Date());
    }

    reactivate(): Cliente {
        return new Cliente(this.id, this.nome, this._documento, this._telefone, this._email, this.endereco, true, this.createdAt, new Date());
    }
}
