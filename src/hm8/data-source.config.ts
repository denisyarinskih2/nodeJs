import { DataSource } from "typeorm";
import {
  Cart,
  CartItem,
  Delivery,
  Order,
  Payment,
  Product,
  User,
} from "./models";
import {
  CartItemMigration1636773719976,
  CartMigration1636773719974,
  OrderMigration1636773719975,
  ProductMigration1636773719973,
  RoleMigration1636773719971,
} from "./migrations";

const {DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS} = process.env;

const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT!),
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [Product, User, Cart, CartItem, Order, Payment, Delivery],
  migrations: [
    CartItemMigration1636773719976,
    CartMigration1636773719974,
    OrderMigration1636773719975,
    ProductMigration1636773719973,
    RoleMigration1636773719971,
  ],
  logging: false,
});

(async function () {
  try {
    await AppDataSource.initialize();
    console.log("Connected to PostgreSQL");
  } catch (e) {
    console.error(e);
  }
})();

export default AppDataSource;
