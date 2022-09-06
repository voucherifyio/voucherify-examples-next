import { EachProduct } from "../pages/types";

export const filterZeroQuantityProducts = (currentProducts: EachProduct[]) => {
  const filteredProducts = currentProducts && currentProducts
    ?.filter((product) => product.quantity !== 0)
    ?.map((product) => {
      return { id: product.id, quantity: product.quantity };
    });
  return { filteredProducts };
};
