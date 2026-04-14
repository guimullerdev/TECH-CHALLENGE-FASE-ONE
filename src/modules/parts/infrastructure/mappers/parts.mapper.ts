import { Part } from '../../domain/entities/parts.entity';

export class PartMapper {
    static toDomain(raw: any): Part {
        return Part.restore({
            id: raw.id,
            name: raw.name,
            description: raw.description ?? undefined,
            price: Number(raw.price),
            stockQty: raw.stockQty,
        });
    }

    static toPrisma(part: Part): any {
        return {
            id: part.id,
            name: part.name,
            description: part.description ?? null,
            price: part.price,
            stockQty: part.stockQty,
        };
    }
}
