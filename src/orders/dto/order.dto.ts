import { PartialType } from '@nestjs/mapped-types';

export class CreateOrderDto {}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
