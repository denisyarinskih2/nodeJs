import express, { Express, type Router } from "express";
import mongoose from "mongoose";
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

const app: Express = express();
const router: Router = express.Router();
const PORT = 8000;

// MongoDB connection URI
const uri = process.env.MONGO_URL!

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

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
