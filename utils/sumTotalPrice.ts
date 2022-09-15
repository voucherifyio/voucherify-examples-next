import { Product } from "../components/types";

export const sumTotalPrice = (products: Product[]) => {
  return products
    ?.map((product: Product) => {
      return product.price * product.quantity;
    })
    .reduce((sum: number, product: number) => sum + product, 0)
};