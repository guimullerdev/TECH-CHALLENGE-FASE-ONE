import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServicesRepository } from '../../domain/repositories/services.repository';
import { Services } from '../../domain/entities/services.entity';
import { ServicesMapper } from '../mappers/services.mapper';

@Injectable()
export class ServicesPrismaRepository implements ServicesRepository {
constructor(private readonly prisma: PrismaService) {}

async findById(id: string): Promise<Services | null> {
    const record = await this.prisma.service.findUnique({
    where: { id },
    });

    if (!record) return null;

    return ServicesMapper.toDomain(record);
    }

    async save(entity: Services): Promise<void> {
        const data = ServicesMapper.toPersistence(entity);

        await this.prisma.service.upsert({
        where: { id: entity.id },
        create: data,
        update: data,
        });
        }

        async delete(id: string): Promise<void> {
            await this.prisma.service.delete({
            where: { id },
            });
            }
            }