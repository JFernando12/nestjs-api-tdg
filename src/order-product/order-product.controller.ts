import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import {
  CreateOrderProductDto,
  UpdateOrderProductDto,
} from './dto/order-product.dto';

@Controller('order-product')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @Get()
  findAll() {
    return this.orderProductService.findAll();
  }

  @Post()
  create(@Body() body: CreateOrderProductDto) {
    return this.orderProductService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateOrderProductDto,
  ) {
    return this.orderProductService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderProductService.remove(id);
  }
}
