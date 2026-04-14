import { Inject, Injectable } from "@nestjs/common";

import { CreatePartDto } from "../dto/create-parts.dto";
import { Part } from "../../domain/entities/parts.entity";
import type { PartRepository } from "../../domain/repositories/parts.repository.interface";

@Injectable()
export class CreatePartUseCase {
    constructor(
        @Inject('PartRepository')
        private readonly repo: PartRepository
    ) { }

    async execute(dto: CreatePartDto): Promise<Part> {
        const part = Part.create(dto);
        return this.repo.create(part);
    }
}
