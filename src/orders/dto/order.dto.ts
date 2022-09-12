import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  client: string;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
