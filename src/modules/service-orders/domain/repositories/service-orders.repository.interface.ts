import { OrdemDeServico, StatusOS } from '../entities/service-orders.entity';

export interface IOrdemDeServicoRepository {
    findById(id: string): Promise<OrdemDeServico | null>;
    findAll(filters?: { status?: StatusOS; clienteId?: string; veiculoId?: string }): Promise<OrdemDeServico[]>;
    create(os: OrdemDeServico): Promise<OrdemDeServico>;
    update(os: OrdemDeServico): Promise<OrdemDeServico>;
    generateNumero(): Promise<string>;
}

export const ORDEM_DE_SERVICO_REPOSITORY = Symbol('IOrdemDeServicoRepository');
