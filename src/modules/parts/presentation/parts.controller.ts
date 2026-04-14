import { Controller, Post, Get, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';

import { CreatePartUseCase } from '../application/use-cases/create-parts.usecase';
import { GetPartUseCase } from '../application/use-cases/get-parts.usecase';
import { UpdatePartUseCase } from '../application/use-cases/update-parts.usecase';
import { DeletePartUseCase } from '../application/use-cases/delete-parts.usecase';
import { CreatePartDto } from '../application/dto/create-parts.dto';
import { UpdatePartDto } from '../application/dto/update-parts.dto';

@Controller('parts')
export class PartsController {
    constructor(
        private readonly createPartUseCase: CreatePartUseCase,
        private readonly getPartUseCase: GetPartUseCase,
        private readonly updatePartUseCase: UpdatePartUseCase,
        private readonly deletePartUseCase: DeletePartUseCase,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreatePartDto) {
        return this.createPartUseCase.execute(dto);
    }

    @Get()
    findAll() {
        return this.getPartUseCase.executeAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.getPartUseCase.execute(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePartDto) {
        return this.updatePartUseCase.execute(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.deletePartUseCase.execute(id);
    }
}
