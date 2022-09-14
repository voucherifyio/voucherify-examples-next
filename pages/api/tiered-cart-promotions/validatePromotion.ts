import { DiscountUnit } from "@voucherify/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { calculateCartTotalAmount } from "../../../utils/calculateCartTotalAmount";
import { validateRequestedCart } from "../../../utils/validateRequestedCart";
import { client } from "../voucherifyClient";

const customer = {
  object: "customer",
  source_id: "test_customer_id_1",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { filteredProducts } = req.body;
  const items = validateRequestedCart(filteredProducts);

  if (req.method === "POST") {
    const { promotions } = await client.promotions.validate({
      customer: customer,
      order: { amount: calculateCartTotalAmount(items) },
    });
    const rewardPromotion = promotions?.filter((campaign) =>
      campaign.name.startsWith("Reward Promotion")
    );

    return res.status(200).json(rewardPromotion?.map(promotion => {
      return {
        banner: promotion?.banner,
        productName: (promotion?.discount as DiscountUnit)?.product?.name,
        hierarchy: promotion?.hierarchy,
        id: promotion?.id,
        name: promotion?.name,
        object: promotion?.object,
        total_applied_discount_amount: promotion?.order?.total_applied_discount_amount
      }
    }))
  }
}
