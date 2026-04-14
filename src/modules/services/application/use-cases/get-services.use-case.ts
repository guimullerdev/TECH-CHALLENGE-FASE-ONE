import { Injectable, NotFoundException } from '@nestjs/common';

import { ServicesRepository } from '../../domain/repositories/services.repository';

@Injectable()
export class GetServicesUseCase {
    constructor(private readonly repository: ServicesRepository) { }

    async execute(id: string) {
        const service = await this.repository.findById(id);
        if (!service) throw new NotFoundException(`Serviço ${id} não encontrado`);
        return service;
    }

    async executeAll() {
        return this.repository.findAll();
    }
}
