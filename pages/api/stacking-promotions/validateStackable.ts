import { NextApiRequest, NextApiResponse } from "next";
import { calculateCartTotalAmount } from "../../../utils/calculateCartTotalAmount";
import { removeDuplicatedPromoObjects } from "../../../utils/removeDuplicatePromo";
import { validateRequestedCart } from "../../../utils/validateRequestedCart";
import { PromotionStackableObj } from "../../../components/types";
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
      const { redeemables, order } = await client.validations.validateStackable(
        promotionStackableObj
      );
      if (!redeemables) {
        return res.status(404).json({
          status: "error",
          message: "Could not find voucher",
        });
      }
      const [voucher] = redeemables?.filter(
        (voucher) => voucher.status === "INAPPLICABLE"
      );
      if (voucher?.result?.error) {
        return res.status(404).json({
          status: "error",
          message: voucher.result.error.details,
        });
      }
      return res.status(200).json({
        amount: order?.amount,
        itemsDiscountAmount: order?.items_discount_amount,
        allDiscount: order?.total_discount_amount,
        redeemables,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error?.details });
    }
  }
}
