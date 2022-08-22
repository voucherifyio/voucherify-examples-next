import { NextApiRequest, NextApiResponse } from "next";

export const defaultProducts = [
  {
    productName: "Johan & Nystrom Caravan",
    productDescription: "20 oz bag",
    quantity: 1,
    price: 26.99,
    src: "/johan2.jpeg",
    id: 1,
  },
  {
    productName: "Illy Arabica",
    productDescription: "Bestseller 18 oz bag",
    quantity: 1,
    price: 21.02,
    src: "/illy_arabica.jpeg",
    id: 2,
  },
  {
    productName: "Hard Beans Etiopia",
    productDescription: "6 oz bag",
    quantity: 1,
    price: 3.88,
    src: "/hardbean.jpeg",
    id: 3,
  },
  {
    productName: "Johan & Nystrom Bourbon",
    productDescription: "20 oz bag",
    quantity: 2,
    price: 41.98,
    src: "/johan2.jpeg",
    id: 4,
  },
];

export default async function defaultProductsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise(() => {
    switch (req.method) {
      case "GET":
        return res.status(200).json(defaultProducts);
      default:
        return res.status(404).json({ error: "No response for this request" });
    }
  });
}
