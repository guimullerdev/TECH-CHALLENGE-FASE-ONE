import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
    @ApiProperty({ example: 'João Silva' })
    @IsNotEmpty() @IsString() name: string;

    @ApiProperty({ example: '12345678901', description: 'CPF ou CNPJ' })
    @IsNotEmpty() @IsString() document: string;

    @ApiProperty({ example: 'joao@email.com' })
    @IsNotEmpty() @IsEmail() email: string;

    @ApiProperty({ example: '11999990000' })
    @IsNotEmpty() @IsString() phone: string;
}
