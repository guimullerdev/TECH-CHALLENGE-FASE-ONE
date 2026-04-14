import { Part } from "../entities/parts.entity";

export interface PartRepository {
    findById(id: string): Promise<Part | null>;
    findAll(): Promise<Part[]>;
    create(part: Part): Promise<Part>;
    save(part: Part): Promise<Part>;
    delete(id: string): Promise<void>;
}
