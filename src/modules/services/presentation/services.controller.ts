import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateServicesUseCase } from '../application/use-cases/create-services.use-case';
import { CreateServicesDto } from '../application/dto/create-services.dto';

@Controller('services')
export class ServicesController {
constructor(private readonly createServicesUseCase: CreateServicesUseCase) {}

@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() dto: CreateServicesDto) {
return this.createServicesUseCase.execute(dto);
}
}