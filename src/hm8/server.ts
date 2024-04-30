import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Express, type Router } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import {
  createOrder,
  deleteProfileCart,
  getProductById,
  getProducts,
  getProfileCart,
  updateProfileCart,
} from "./controllers";
import {
  authValidation,
  productDetailsValidation,
  updateProfileCartValidation,
} from "./middlewares";
import { Cart, CartItem, Delivery, Order, Payment, User } from "./models";
import { Product } from "./models/Product";

const app: Express = express();
const router: Router = express.Router();
dotenv.config();

router.get("/profile/cart", authValidation, getProfileCart);
router.post("/profile/cart/checkout", authValidation, createOrder);
router.delete("/profile/cart", authValidation, deleteProfileCart);
router.put(
  "/profile/cart",
  [authValidation, updateProfileCartValidation],
  updateProfileCart
);
router.get("/products", authValidation, getProducts);
router.get(
  "/products/:productId",
  [authValidation, productDetailsValidation],
  getProductById
);
app.use(bodyParser.json());
app.use("/api", router);

/**
 * Using DataSource approach I'm getting error: ConnectionNotFoundError: Connection "default" was not found.
 */

// const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "node_gmp",
//   password: "password123",
//   database: "node_gmp",
//   entities: [Product, User, Cart, CartItem, Order, Payment, Delivery],
//   migrations: ["src/hm8/migrations/*.ts"],
//   migrationsTableName: "task_migrations",
//   logging: false,
// });

// (async function () {
//   try {
//     await AppDataSource.initialize();
//     console.log("Connected to PostgreSQL");
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}`);
//     });
//   } catch (e) {
//     console.error(e);
//   }
// })();

// export default AppDataSource;

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "node_gmp",
  password: process.env.POSTGRE_DB_PASS,
  database: "node_gmp",
  entities: [Product, User, Cart, CartItem, Order, Payment, Delivery],
  migrations: ["src/hm8/migrations/*.ts"],
  migrationsTableName: "task_migrations",
  synchronize: true,
  logging: false,
})
  .then(async (connection) => {
    console.log("Connected to PostgreSQL");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.error(error));
