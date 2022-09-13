import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNumber()
  @IsPositive()
  customerId: number;
}
