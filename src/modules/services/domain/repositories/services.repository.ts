import { Services } from '../entities/services.entity';

export abstract class ServicesRepository {
    abstract findById(id: string): Promise<Services | null>;
    abstract findAll(): Promise<Services[]>;
    abstract save(entity: Services): Promise<void>;
    abstract delete(id: string): Promise<void>;
}