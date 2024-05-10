import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Cart } from "./Cart";
import { Order } from "./Order";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
  cart: Cart;

  @OneToMany(() => Order, (order) => order.userId)
  orders: Order[];

  @Column()
  password: string;

  @ManyToOne(() => Order, (order) => order.user)
  @JoinColumn({name: 'role_id'})
  role: string;
}
