import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  client: string;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  items: OrderProduct[];
}
