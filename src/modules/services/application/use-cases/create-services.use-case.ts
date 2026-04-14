import { Injectable } from '@nestjs/common';

import { ServicesRepository } from '../../domain/repositories/services.repository';
import { CreateServicesDto } from '../dto/create-services.dto';
import { Services } from '../../domain/entities/services.entity';

@Injectable()
export class CreateServicesUseCase {
    constructor(private readonly repository: ServicesRepository) { }

    async execute(dto: CreateServicesDto): Promise<Services> {
        const entity = Services.create(dto);
        await this.repository.save(entity);
        return entity;
    }
}
