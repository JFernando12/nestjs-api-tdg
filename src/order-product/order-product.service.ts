import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { OrderProduct } from './entities/order-product.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private orderProductRepo: Repository<OrderProduct>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll() {
    return await this.orderProductRepo.find({
      relations: ['product', 'order'],
    });
  }

  async create(body: CreateOrderProductDto) {
    const order = await this.orderRepo.findOneBy({ id: body.orderId });
    const product = await this.productRepo.findOneBy({ id: body.productId });
    const newOrderProduct = this.orderProductRepo.create({
      order,
      product,
      quantity: body.quantity,
    });
    return this.orderProductRepo.save(newOrderProduct);
  }

  async update(id: number, body: UpdateOrderProductDto) {
    const orderProduct = await this.orderProductRepo.findOneBy({ id });
    if (body.orderId) {
      const order = await this.orderRepo.findOneBy({ id: body.orderId });
      orderProduct.order = order;
    }
    if (body.productId) {
      const product = await this.productRepo.findOneBy({ id: body.productId });
      orderProduct.product = product;
    }
    if (body.quantity) {
      orderProduct.quantity = body.quantity;
    }
    return this.orderProductRepo.save(orderProduct);
  }

  async remove(id: number) {
    await this.orderProductRepo.delete(id);
    return `You removed a #${id} orderProduct`;
  }
}
