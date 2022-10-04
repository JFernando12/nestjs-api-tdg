import { Exclude, Expose } from 'class-transformer';
import { Customer } from 'src/customers/entities/customer.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.order)
  customer: Customer;

  @Exclude()
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  items: OrderProduct[];

  @Expose()
  get products() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .map((item) => ({
          productId: item.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        }));
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .reduce((totalSum, item) => {
          const totalItems = item.product.price * item.quantity;
          return totalSum + totalItems;
        }, 0);
    }
    return 0;
  }
}
