import { client } from "../voucherifyClient";
import { NextApiRequest, NextApiResponse } from "next";
import { validateRequestedCart } from "../../../utils/validateRequestedCart";
import { mapCartItemToVoucherifyItem } from "../../../utils/mapCartItemToVoucherifyItem";
import { calculateCartTotalAmount } from "../../../utils/calculateCartTotalAmount";

const customer = {
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
        const { valid, order, code, discount } =
          await client.validations.validateVoucher(voucherCode, {
            order: {
              items: items.map(mapCartItemToVoucherifyItem),
              amount: calculateCartTotalAmount(items),
            },
            customer: customer,
          });
        if (!valid) {
          return res.status(404).json({ error: "Voucher not found" });
        }
        return res.status(200).json({
          discount:
            code === "FREE-SHIPPING" ? 0 : order?.total_applied_discount_amount,
          code,
        });
      default:
        return res.status(400).json({ error: "No response for this request" });
    }
  });
}
