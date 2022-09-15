import { Customer } from 'src/customers/entities/customer.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.order)
  customer: Customer;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  items: OrderProduct[];
}
