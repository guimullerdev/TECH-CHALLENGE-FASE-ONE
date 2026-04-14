import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import type { PartRepository } from "../../domain/repositories/parts.repository.interface";

@Injectable()
export class GetPartUseCase {
    constructor(
        @Inject('PartRepository')
        private readonly repo: PartRepository
    ) { }

    async execute(id: string) {
        const part = await this.repo.findById(id);
        if (!part) throw new NotFoundException(`Peça ${id} não encontrada`);
        return part;
    }

    async executeAll() {
        return this.repo.findAll();
    }
}
