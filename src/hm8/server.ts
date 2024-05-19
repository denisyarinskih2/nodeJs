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
  healthcheck,
  updateProfileCart,
} from "./controllers";
import {
  authValidation,
  productDetailsValidation,
  updateProfileCartValidation,
} from "./middlewares";

const morgan = require("morgan");
const app: Express = express();
const router: Router = express.Router();
let connections: any = [];
dotenv.config();

const winston = require("winston");
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

// Winston logger setup
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "ddd, DD MMM YYYY HH:mm:ss",
    }),
    winston.format.printf(
      ({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

// Log an error message
logger.error("An error occurred", { metadata: "some additional data" });

// Log an info message
logger.info("Server started on port 3000");

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
router.get("/health", healthcheck);

const server = app.listen(process.env.PORT, () => {
  console.log('port >>>>>', process.env.PORT);
  logger.info(`Server is running on port ${process.env.PORT}`);
});

app.use(bodyParser.json());
app.use("/api", router);
app.use(morgan("combined"));

// log middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} - ${duration}ms`);
  });
  next();
});

server.on("connection", (connection) => {
  connections.push(connection);

  connection.on("close", () => {
    connections = connection.filter(
      (currentCOnnection) => currentCOnnection !== connection
    );
  });
});

function shutdown() {
  logger.info("Received kill signal, shutting down gracefully");

  server.close(() => {
    logger.info("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 20000);

  connections.forEach((connection) => connection.end());

  setTimeout(() => {
    connections.forEach((connection: any) => connection.destroy());
  }, 10000);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
