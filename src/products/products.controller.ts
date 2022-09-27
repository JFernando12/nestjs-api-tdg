import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './dtos/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getAll(@Query() params: FilterProductsDto) {
    return this.productService.getAll(params);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) productId: number) {
    return this.productService.getOne(productId);
  }

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) productId: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.update(productId, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) productId: number) {
    return this.productService.remove(productId);
  }
}
