import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

import { PartRepository } from "../../domain/repositories/parts.repository.interface";
import { PartMapper } from "../mappers/parts.mapper";
import { Part } from "../../domain/entities/parts.entity";

@Injectable()
export class PartPrismaRepository implements PartRepository {
    constructor(private prisma: PrismaService) { }

    async findById(id: string): Promise<Part | null> {
        const raw = await this.prisma.part.findUnique({ where: { id } });
        if (!raw) return null;
        return PartMapper.toDomain(raw);
    }

    async findAll(): Promise<Part[]> {
        const raws = await this.prisma.part.findMany({ orderBy: { name: 'asc' } });
        return raws.map(PartMapper.toDomain);
    }

    async create(part: Part): Promise<Part> {
        const raw = await this.prisma.part.create({ data: PartMapper.toPrisma(part) });
        return PartMapper.toDomain(raw);
    }

    async save(part: Part): Promise<Part> {
        const raw = await this.prisma.part.update({
            where: { id: part.id },
            data: PartMapper.toPrisma(part),
        });
        return PartMapper.toDomain(raw);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.part.delete({ where: { id } });
    }
}
