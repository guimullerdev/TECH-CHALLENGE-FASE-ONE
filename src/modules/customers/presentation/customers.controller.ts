import { Controller, Post, Body } from '@nestjs/common';
import { CreateCustomerUseCase } from '../application/use-cases/create-customers.usecase';
// import { GetCustomerUseCase } from '../application/use-cases/get-customers.usecase';
// import { UpdateCustomerUseCase } from '../application/use-cases/update-customers.usecase';
// import { DeleteCustomerUseCase } from '../application/use-cases/delete-customers.usecase';
import { CreateCustomerDto } from '../application/dto/create-customers.dto';

@Controller('customers')
export class CustomersController {
    constructor(
        private readonly createCustomerUseCase: CreateCustomerUseCase,
        // private readonly getCustomerUseCase: GetCustomerUseCase,
        // private readonly updateCustomerUseCase: UpdateCustomerUseCase,
        // private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
    ) { }

    @Post()
    create(@Body() dto: CreateCustomerDto) {
        return this.createCustomerUseCase.execute(dto);
    }

    // @Get()
    // findAll() {
    //     return this.getCustomerUseCase.executeAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.getCustomerUseCase.execute(id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    //     return this.updateCustomerUseCase.execute(id, dto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.deleteCustomerUseCase.execute(id);
    // }
}