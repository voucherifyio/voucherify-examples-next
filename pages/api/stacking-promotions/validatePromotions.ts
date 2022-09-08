import { NextApiRequest, NextApiResponse } from "next";
import { calculateCartTotalAmount } from "../../../utils/calculateCartTotalAmount";
import { validateRequestedCart } from "../../../utils/validateRequestedCart";
import { client } from "../voucherifyClient";

type hotVoucher = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { filteredProducts } = req.body;
  const items = validateRequestedCart(filteredProducts);
  if (req.method === "POST") {
    const { promotions } = await client.promotions.validate({
      order: { amount: calculateCartTotalAmount(items) },
    });
    const hotPromotion = promotions?.filter((voucher) =>
      voucher.name.startsWith("Hot Promotion")
    );
    return res.status(200).json(hotPromotion);
  }
}
