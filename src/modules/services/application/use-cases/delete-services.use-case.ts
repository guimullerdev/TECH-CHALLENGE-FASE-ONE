import { Injectable, NotFoundException } from '@nestjs/common';

import { ServicesRepository } from '../../domain/repositories/services.repository';

@Injectable()
export class DeleteServicesUseCase {
    constructor(private readonly repository: ServicesRepository) { }

    async execute(id: string): Promise<void> {
        const existing = await this.repository.findById(id);
        if (!existing) throw new NotFoundException(`Serviço ${id} não encontrado`);
        await this.repository.delete(id);
    }
}
