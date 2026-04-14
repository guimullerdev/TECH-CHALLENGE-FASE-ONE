import { Services } from '../../domain/entities/services.entity';

export class ServicesMapper {
    static toDomain(raw: any): Services {
        return Services.restore({
            id: raw.id,
            name: raw.name,
            description: raw.description ?? undefined,
            price: Number(raw.price),
            estimatedTime: raw.estimatedTime,
        });
    }

    static toPersistence(entity: Services): any {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            price: entity.price,
            estimatedTime: entity.estimatedTime,
        };
    }
}
