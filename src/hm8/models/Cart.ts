import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  user!: string;

  @Column({ default: false })
  isDeleted!: boolean;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade: true,
    onDelete: "CASCADE",
  })
  items!: CartItem[];
}

@Entity()
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Product, (product) => product.description, { cascade: true })
  @JoinColumn({
    name: "product_id",
  })
  product!: Product | null;

  @Column({ nullable: false })
  count!: number;

  @ManyToOne(() => Cart, (cart) => cart.id, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "cart_id",
  })
  cart!: Cart;
}
