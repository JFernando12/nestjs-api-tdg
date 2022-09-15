import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
