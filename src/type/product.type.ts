import { Stock } from "./stock.type";

export type Product = {
  _id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  stock: Stock[];
  thumbnail: string;
  images: string[];
  isNewProduct: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
};
