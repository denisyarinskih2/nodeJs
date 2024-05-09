import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Express, type Router } from "express";
import "reflect-metadata";
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
router.delete("/profile/cart", [authValidation], deleteProfileCart);
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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use(bodyParser.json());
app.use("/api", router);
