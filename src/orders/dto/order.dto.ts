import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  customerId: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
