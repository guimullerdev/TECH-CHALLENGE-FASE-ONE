import { Veiculo } from '../entities/vehicle.entity';

export interface IVeiculoRepository {
    findById(id: string): Promise<Veiculo | null>;
    findByPlaca(placa: string): Promise<Veiculo | null>;
    findAll(filters?: { clienteId?: string; placa?: string; ativo?: boolean }): Promise<Veiculo[]>;
    create(veiculo: Veiculo): Promise<Veiculo>;
    update(veiculo: Veiculo): Promise<Veiculo>;
}

export const VEICULO_REPOSITORY = Symbol('IVeiculoRepository');
