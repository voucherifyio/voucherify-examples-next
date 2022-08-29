import { EachProduct } from "../pages/voucher-code-redemption/types";

export const filterZeroQuantityProducts = (currentProducts: EachProduct[]) => {
  const filteredProducts = currentProducts
    .filter((product) => product.quantity !== 0)
    .map((product) => {
      return { id: product.id, quantity: product.quantity };
    });
  return { filteredProducts };
};
