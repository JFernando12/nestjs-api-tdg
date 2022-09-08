import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { In, Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = this.orderRepo.create(createOrderDto);
    if (createOrderDto.productsIds) {
      const products = await this.productRepo.findBy({
        id: In(createOrderDto.productsIds),
      });
      console.log(products);
      newOrder.products = products;
      console.log(newOrder);
    }
    return await this.orderRepo.save(newOrder);
  }

  findAll() {
    return this.orderRepo.find();
  }

  findOne(id: number) {
    return this.orderRepo.findBy({ id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepo.findBy({ id });
    return await this.orderRepo.save({ ...order, ...updateOrderDto });
  }

  async remove(id: number) {
    await this.orderRepo.delete({ id });
    return `You removed a #${id} order`;
  }
}
