import { Injectable, NotFoundException } from '@nestjs/common';

import { ServicesRepository } from '../../domain/repositories/services.repository';
import { UpdateServicesDto } from '../dto/update-services.dto';

@Injectable()
export class UpdateServicesUseCase {
    constructor(private readonly repository: ServicesRepository) { }

    async execute(id: string, dto: UpdateServicesDto) {
        const existing = await this.repository.findById(id);
        if (!existing) throw new NotFoundException(`Serviço ${id} não encontrado`);
        const updated = existing.update(dto);
        await this.repository.save(updated);
        return updated;
    }
}
