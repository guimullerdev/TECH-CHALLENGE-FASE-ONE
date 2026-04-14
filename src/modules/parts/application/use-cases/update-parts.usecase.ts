import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import type { PartRepository } from "../../domain/repositories/parts.repository.interface";
import { UpdatePartDto } from "../dto/update-parts.dto";

@Injectable()
export class UpdatePartUseCase {
    constructor(
        @Inject('PartRepository')
        private readonly repo: PartRepository
    ) { }

    async execute(id: string, dto: UpdatePartDto) {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException(`Peça ${id} não encontrada`);
        const updated = existing.update(dto);
        return this.repo.save(updated);
    }
}
