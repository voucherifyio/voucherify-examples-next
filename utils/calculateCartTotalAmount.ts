export const calculateCartTotalAmount = (
  items: {
    quantity: number;
    productName: string;
    productDescription: string;
    price: number;
    src: string;
    id: number;
  }[]
) => {
  return (
    Math.round(
      items.reduce((sum, item) => sum + item.price * item.quantity * 100, 0) *
        100
    ) / 100
  );
};
