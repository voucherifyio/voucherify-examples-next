import { SimpleCustomer } from "@voucherify/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { calculateCartTotalAmount } from "../../../utils/calculateCartTotalAmount";
import { mapCartItemToVoucherifyItem } from "../../../utils/mapCartItemToVoucherifyItem";
import { validateRequestedCart } from "../../../utils/validateRequestedCart";
import { client } from "../voucherifyClient";

const customer: Omit<SimpleCustomer, "id"> = {
  object: "customer",
  source_id: "test_customer_id_1",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise(async () => {
    const { voucherCode, filteredProducts } = req.body;
    const items = validateRequestedCart(filteredProducts);
    switch (req.method) {
      case "POST":
        const { result } = await client.redemptions.redeem(voucherCode, {
          order: {
            items: items.map(mapCartItemToVoucherifyItem),
            amount: calculateCartTotalAmount(items),
          },
          customer: customer,
        });
        if (!result) {
          return res.status(404).json({ error: "Voucher cannot be redeem" });
        }
        return res.status(200).json({ message: "Voucher redemeed" });
      default:
        return res.status(400).json({ error: "No response for this request" });
    }
  });
}
