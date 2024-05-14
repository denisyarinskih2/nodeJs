import express, { Express, type Router } from "express";
import mongoose from "mongoose";
import {
  createOrder,
  deleteProfileCart,
  getProductById,
  getProducts,
  getProfileCart,
  signin,
  signup,
  updateProfileCart
} from "./controllers";
import {
  authValidation,
  productDetailsValidation,
  updateProfileCartValidation,
} from "./middlewares";
import dotenv from "dotenv";
import { verifyToken } from "./middlewares/verify-token.middleware";
import { isAdmin } from "./middlewares/is-admin.middleware";

const app: Express = express();
const router: Router = express.Router();
const PORT = 8000;
dotenv.config();

// MongoDB connection URI
const uri = process.env.MONGO_URL!;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

app.use(express.json());

router.get("/profile/cart", [verifyToken, authValidation], getProfileCart);
router.post(
  "/profile/cart/checkout",
  [verifyToken, authValidation],
  createOrder
);
router.delete(
  "/profile/cart",
  [verifyToken, isAdmin, authValidation],
  deleteProfileCart
);
router.put(
  "/profile/cart",
  [verifyToken, authValidation, updateProfileCartValidation],
  updateProfileCart
);
router.get("/products", [verifyToken, authValidation], getProducts);
router.get(
  "/products/:productId",
  [verifyToken, authValidation, productDetailsValidation],
  getProductById
);
router.post("/auth/register", signup);
router.post("/auth/login", signin);

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
