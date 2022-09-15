import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  async create(body: CreateOrderDto) {
    const customer = await this.customerRepo.findOneBy({ id: body.customerId });
    const newOrder = this.orderRepo.create(customer);
    return await this.orderRepo.save(newOrder);
  }

  async findAll() {
    return await this.orderRepo.find({ relations: ['items', 'items.product'] });
  }

  async findOne(id: number) {
    return await this.orderRepo.findBy({ id });
  }

  async update(id: number, body: UpdateOrderDto) {
    const order = await this.orderRepo.findBy({ id });
    return await this.orderRepo.save({ ...order, ...body });
  }

  async remove(id: number) {
    await this.orderRepo.delete({ id });
    return `You removed a #${id} order`;
  }
}
