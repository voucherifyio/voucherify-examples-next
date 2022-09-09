import { NextApiRequest, NextApiResponse } from "next";
import { validateRequestedCart } from "../../../utils/validateRequestedCart";
import { calculateCartTotalAmount } from "../../../utils/calculateCartTotalAmount";
import { removeDuplicatedPromoObjects } from "../../../utils/removeDuplicatePromo";
import { PromotionStackableObj } from "../../types";
import { client } from "../voucherifyClient";

const customer = {
  object: "customer",
  source_id: "test_customer_id_1",
};

const promotionStackableObj: PromotionStackableObj = {
  order: {
    amount: 0,
  },
  customer: customer,
  redeemables: [],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { redeemables, filteredProducts } = req.body;
  const items = validateRequestedCart(filteredProducts);
  promotionStackableObj.order.amount = calculateCartTotalAmount(items);
  promotionStackableObj.redeemables = removeDuplicatedPromoObjects(redeemables);

  if (req.method === "POST") {
    try {
      const { redemptions } = await client.redemptions.redeemStackable(
        promotionStackableObj
      );
      if (!redemptions) {
        return res.status(404).json({
          status: "ERROR",
          message: "Vouchers cannot be redeemed",
        });
      }
      return res.status(200).json({
        status: "SUCCESS",
        message: "Vouchers redeemed",
      });
    } catch (error) {
      return res.status(400).json({
        status: "ERROR",
        message: "Vouchers cannot be redeemed",
      });
    }
  }
}
