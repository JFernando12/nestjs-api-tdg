import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}
  async create(body: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(body);
    return this.customerRepo.save(newCustomer);
  }

  async findAll() {
    return await this.customerRepo.find({});
  }

  async findOne(id: number) {
    return await this.customerRepo.findOneBy({ id });
  }

  async update(id: number, body: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOneBy({ id });
    return this.customerRepo.save({ ...customer, ...body });
  }

  async remove(id: number) {
    await this.customerRepo.delete({ id });
    return `You removed #${id} customer`;
  }
}
