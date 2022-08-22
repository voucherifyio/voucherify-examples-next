import { EachProduct } from "../pages/voucher-code-redemption/types";

export const sumTotalPrice = (products: EachProduct[]) => {
    return products
      .map((product: EachProduct) => {
        return product.price * product.quantity;
      })
      .reduce((sum: number, product: number) => sum + product, 0)
      .toFixed(2);
  };