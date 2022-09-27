import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './dtos/product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async getAll(params: FilterProductsDto) {
    const { limit, offset } = params;
    return await this.productRepo.find({ take: limit, skip: offset });
  }

  async getOne(id: number) {
    return await this.productRepo.findOneBy({ id });
  }

  async create(body: CreateProductDto) {
    const newProduct = this.productRepo.create(body);
    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id });
    return await this.productRepo.save({ ...product, ...payload });
  }

  async remove(id: number) {
    await this.productRepo.delete(id);
    return `Product ${id} has been deleted`;
  }
}
