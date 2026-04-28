import { Cliente as PrismaCliente, TipoDocumento } from '@prisma/client';
import { Cliente } from '../../domain/entities/customers.entity';

export class ClienteMapper {
    static toDomain(raw: PrismaCliente): Cliente {
        return Cliente.restore({
            id: raw.id,
            nome: raw.nome,
            documento: raw.documento,
            telefone: raw.telefone ?? undefined,
            email: raw.email ?? undefined,
            endereco: raw.endereco ?? undefined,
            ativo: raw.ativo,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }

    static toPrisma(cliente: Cliente): Omit<PrismaCliente, never> {
        return {
            id: cliente.id,
            nome: cliente.nome,
            documento: cliente.documento,
            tipoDocumento: cliente.tipoDocumento as TipoDocumento,
            telefone: cliente.telefone ?? null,
            email: cliente.email ?? null,
            endereco: cliente.endereco ?? null,
            ativo: cliente.ativo,
            createdAt: cliente.createdAt,
            updatedAt: cliente.updatedAt,
        };
    }
}
