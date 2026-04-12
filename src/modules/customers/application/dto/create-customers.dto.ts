import { IsString, IsEmail } from 'class-validator';

export class CreateCustomerDto {
    @IsString() name: string;
    @IsString() document: string; // CPF/CNPJ
    @IsEmail() email: string;
    @IsString() phone: string;
}
