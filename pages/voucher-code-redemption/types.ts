export type EachProduct = {
  productName: string;
  productDescription: string;
  quantity: number;
  price: number;
  src: string;
  id: number;
};

export type Products = {
  products: EachProduct[];
};
