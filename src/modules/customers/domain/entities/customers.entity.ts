import { CpfCnpj } from '../value-objects/cpf-cnpj.vo';
import { Email } from '../value-objects/email.vo';
import { Telefone } from '../value-objects/telefone.vo';

export class Cliente {
    private readonly _cpf: CpfCnpj;
    private readonly _email: Email | undefined;
    private readonly _telefone: Telefone | undefined;

    private constructor(
        public readonly id: string,
        public readonly nome: string,
        cpf: CpfCnpj,
        telefone: Telefone | undefined,
        email: Email | undefined,
        public readonly endereco: string | undefined,
        public readonly ativo: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {
        this._cpf = cpf;
        this._telefone = telefone;
        this._email = email;
    }

    get cpf(): string { return this._cpf.getValue(); }
    get telefone(): string | undefined { return this._telefone?.getValue(); }
    get email(): string | undefined { return this._email?.getValue(); }

    static create(props: {
        nome: string;
        cpf: string;
        telefone?: string;
        email?: string;
        endereco?: string;
    }): Cliente {
        const cpf = CpfCnpj.create(props.cpf);
        const email = props.email ? Email.create(props.email) : undefined;
        const telefone = props.telefone ? Telefone.create(props.telefone) : undefined;
        return new Cliente(
            crypto.randomUUID(),
            props.nome,
            cpf,
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
        cpf: string;
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
            CpfCnpj.restore(props.cpf),
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
            this._cpf,
            telefone,
            email,
            props.endereco ?? this.endereco,
            this.ativo,
            this.createdAt,
            new Date(),
        );
    }

    deactivate(): Cliente {
        return new Cliente(this.id, this.nome, this._cpf, this._telefone, this._email, this.endereco, false, this.createdAt, new Date());
    }

    reactivate(): Cliente {
        return new Cliente(this.id, this.nome, this._cpf, this._telefone, this._email, this.endereco, true, this.createdAt, new Date());
    }
}
