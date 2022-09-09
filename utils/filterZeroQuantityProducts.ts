import { Product } from "../components/types";

export const filterZeroQuantityProducts = (currentProducts: Product[]) => {
  const filteredProducts = currentProducts
    ?.filter((product) => product.quantity !== 0)
    ?.map((product) => {
      return { id: product.id, quantity: product.quantity };
    });
  return { filteredProducts };
};
