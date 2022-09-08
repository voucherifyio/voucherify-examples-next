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
  const { voucherCode, filteredProducts } = req.body;
  const items = validateRequestedCart(filteredProducts);
  if (req.method === "POST") {
    const { valid, order, code } = await client.validations.validateVoucher(
      voucherCode,
      {
        order: {
          items: items.map(mapCartItemToVoucherifyItem),
          amount: calculateCartTotalAmount(items),
        },
        customer: customer,
      }
    );
    if (!valid) {
      return res.status(404).json({ error: "Voucher not found" });
    }
    return res.status(200).json({
      discount:
        code === "FREE-SHIPPING" ? 0 : order?.total_applied_discount_amount,
      code,
    });
  }
}
