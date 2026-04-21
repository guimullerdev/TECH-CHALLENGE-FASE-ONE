import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { PECA_REPOSITORY, IPecaRepository } from '../../domain/repositories/parts.repository.interface';
import { Peca } from '../../domain/entities/parts.entity';
import { CreatePecaDto } from '../dto/create-parts.dto';

@Injectable()
export class CreatePecaUseCase {
    constructor(
        @Inject(PECA_REPOSITORY)
        private readonly repo: IPecaRepository,
    ) {}

    async execute(dto: CreatePecaDto): Promise<Peca> {
        if (dto.codigo) {
            const existing = await this.repo.findByCodigo(dto.codigo);
            if (existing) throw new ConflictException(`Código ${dto.codigo} já cadastrado`);
        }
        const peca = Peca.create({
            nome: dto.nome,
            precoUnitario: dto.precoUnitario,
            qtdTotal: dto.qtdTotal,
            codigo: dto.codigo,
            descricao: dto.descricao,
        });
        return this.repo.create(peca);
    }
}
