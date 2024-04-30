import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartItem } from "./Cart";

export type ORDER_STATUS = "created" | "completed";

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  type!: string;

  @Column({ type: "jsonb" })
  address?: any;

  @Column({ type: "jsonb" })
  creditCard?: any;
}

@Entity()
export class Delivery extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  type!: string;

  @Column({ type: "jsonb" })
  address?: any;
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  userId!: string;

  @Column({ nullable: false })
  cartId!: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  items!: CartItem[];

  @Column({ type: "jsonb", nullable: false })
  payment!: Payment;

  @Column({ type: "jsonb", nullable: false })
  delivery!: Delivery;

  @Column({ nullable: false })
  comments!: string;

  @Column({ nullable: false })
  status!: ORDER_STATUS;

  @Column({ type: "numeric", nullable: false })
  total!: number;
}
