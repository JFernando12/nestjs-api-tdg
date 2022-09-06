import { Product } from 'src/products/entities/product.entity';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Product, (product) => product.order)
  products: Product[];

  @CreateDateColumn()
  createAt: Date;
}
