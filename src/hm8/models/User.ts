import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { Order } from "./Order";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  email!: string;

  @OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
  cart!: Cart;

  @OneToMany(() => Order, (order) => order.userId, { cascade: true })
  orders!: Order[];
}
