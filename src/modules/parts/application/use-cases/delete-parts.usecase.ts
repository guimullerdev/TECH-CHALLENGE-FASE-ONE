import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import type { PartRepository } from "../../domain/repositories/parts.repository.interface";

@Injectable()
export class DeletePartUseCase {
    constructor(
        @Inject('PartRepository')
        private readonly repo: PartRepository
    ) { }

    async execute(id: string): Promise<void> {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException(`Peça ${id} não encontrada`);
        await this.repo.delete(id);
    }
}
