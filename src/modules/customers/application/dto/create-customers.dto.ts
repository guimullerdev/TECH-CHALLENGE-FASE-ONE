import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreateCustomerDto {
    @ApiProperty({ example: 'João Silva' })
    @IsString() name: string;

    @ApiProperty({ example: '12345678901', description: 'CPF ou CNPJ' })
    @IsString() document: string;

    @ApiProperty({ example: 'joao@email.com' })
    @IsEmail() email: string;

    @ApiProperty({ example: '11999990000' })
    @IsString() phone: string;
}
