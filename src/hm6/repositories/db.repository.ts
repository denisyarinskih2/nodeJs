import { Database, Product, User } from "../models";

const users: User[] = [
  { id: "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c" },
  { id: "eb5a26af-6e4c-4f31-a9b1-3450d42ac66b" },
  { id: "eb5a26af-6e4c-4f31-a9b1-3450d42ac66d" },
];

const products: Product[] = [
  {
    id: 'eb5a26af-6e4c-4f31-a9b1-3450d42ac66a',
    title: 'Product 1',
    description: 'Product 1 description',
    price: 10,
  },
  {
    id: 'eb5a26af-6e4c-4f31-a9b1-3450d42ac66e',
    title: 'Product 2',
    description: 'Product 2 description',
    price: 25
  },
  {
    id: 'eb5a26af-6e4c-4f31-a9b1-3450d42ac66f',
    title: 'Product 3',
    description: 'Product 3 description',
    price: 100
  },
];

const dataBase: Database = {
  users,
  carts: [],
  orders: [],
  products,
};

export default dataBase;
