import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
