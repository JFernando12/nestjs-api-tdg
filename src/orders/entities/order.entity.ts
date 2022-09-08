import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  client: string;

  @ManyToOne(() => Product)
  products: Product[];
}
