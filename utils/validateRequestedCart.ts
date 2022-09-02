import { defaultProducts } from "./defaultProducts";

type RequestedItem = {
  productName: string;
  price: number;
  id: number;
  quantity: number;
};

export const validateRequestedCart = (
  requestedCart: RequestedItem[]
): {
  quantity: number;
  src: string;
  price: number;
  id: number;
  productName: string;
  productDescription: string;
}[] => {
  const validatedCart = [];
  for (const requestedItem of requestedCart) {
    const item = defaultProducts.find(
      (item) => requestedItem?.id && item.id === requestedItem.id
    );
    if (item?.id) {
      validatedCart.push({ ...item, quantity: requestedItem.quantity || 0 });
    }
  }
  return validatedCart;
};
