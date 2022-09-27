import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, FilterUsersDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  async create(body: CreateUserDto) {
    const newUser = this.userRepo.create(body);
    if (body.customerId) {
      const customer = await this.customerRepo.findOneBy({
        id: body.customerId,
      });
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  async findAll(params: FilterUsersDto) {
    const { limit, offset } = params;
    return await this.userRepo.find({
      relations: ['customer'],
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    return await this.userRepo.findOneBy({ id });
  }

  async update(id: number, body: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (body.customerId) {
      const customer = await this.customerRepo.findOneBy({
        id: body.customerId,
      });
      user.customer = customer;
    }
    return await this.userRepo.save({ ...user, ...body });
  }

  async remove(id: number) {
    await this.userRepo.delete({ id });
    return `You removed a #${id} user`;
  }
}
