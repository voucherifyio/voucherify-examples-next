import { client } from "../voucherifyClient";
import { NextApiRequest, NextApiResponse } from "next";
import { defaultProducts } from "./defaultProducts";
import { EachProduct } from "../../voucher-code-redemption/types";

const customer = {
  source_id: "test_customer_id_1",
};

//look

type RequestedItem = {
  sku_id: string,
  productName: string,
  price: number,
  id: number,
  quantity: number,
  length: number
}

const validateRequestedCart = (requestedCart: RequestedItem[]) => {
  if (!requestedCart || !requestedCart.length) {
    throw new Error("Requested cart should be an array of cart items");
  }

  return requestedCart
    .map((requestedItem) => {
      const item = defaultProducts.find(
        (item) => requestedItem?.id && item.id === requestedItem.id
      );
      if (!item) {
        return false;
      }
      return { ...item, quantity: requestedItem.quantity || 0 };
    })
    .filter((item) => !!item && item.quantity);
};

const mapCartItemToVoucherifyItem = (item) => ({
  sku_id: item.productName,
  price: item.price,
  quantity: item.quantity,
});

const calculateCartTotalAmount = (items) =>
  items
    .reduce((sum, item) => sum + item.price * item.quantity * 100, 0)
    .toFixed(2);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise(async () => {
    const { voucherCode, filteredProducts } = req.body;
    const items = validateRequestedCart(filteredProducts);
    switch (req.method) {
      case "POST":
        const { valid, order, code, discount } =
          await client.validations.validateVoucher(voucherCode, {
            order: {
              items: items.map(mapCartItemToVoucherifyItem),
              amount: calculateCartTotalAmount(items),
            },
            customer: customer,
          });
        console.log(valid);
        if (!valid) {
          return res.status(404).json({ error: "Voucher not found" });
        }
        return res.status(200).json({
          order,
          code,
          discount,
        });
      default:
        return res.status(400).json({ error: "No response for this request" });
    }
  });
}
