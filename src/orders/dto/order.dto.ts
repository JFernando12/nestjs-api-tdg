import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  client: string;

  @IsArray()
  @IsNotEmpty()
  productsIds: number[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
