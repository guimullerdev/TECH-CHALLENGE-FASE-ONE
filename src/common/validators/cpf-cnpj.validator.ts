import { registerDecorator, ValidationOptions } from 'class-validator';
import { CpfCnpj } from '../../modules/customers/domain/value-objects/cpf-cnpj.vo';

export function IsDocumentoValido(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isDocumentoValido',
            target: object.constructor,
            propertyName,
            options: {
                message: 'Documento inválido: CPF deve ter 11 dígitos válidos ou CNPJ 14 dígitos válidos',
                ...validationOptions,
            },
            validator: {
                validate(value: unknown) {
                    if (typeof value !== 'string') return false;
                    try {
                        CpfCnpj.create(value);
                        return true;
                    } catch {
                        return false;
                    }
                },
            },
        });
    };
}
