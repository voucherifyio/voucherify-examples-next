import { StackableRedeemableObject, StackableRedeemableParams } from "@voucherify/sdk";

export type Product = {
  productName: string;
  productDescription: string;
  quantity: number;
  price: number;
  src: string;
  id: number;
};

export type Products = {
  products: Product[];
};

export type Voucher = {
  object: StackableRedeemableObject,
  id: string,
  order?: {
    total_applied_discount_amount: number,
    total_amount: number
    items_discount_amount: number
  } | undefined
}

export type PromotionStackableObj = {
  order: {
      amount: number;
  };
  customer: {
      object: string;
      source_id: string;
  };
  redeemables: StackableRedeemableParams[];
}

export type VouchersProperties = {
  amount: number,
  itemsDiscountAmount: number,
  allDiscount: number,
  redeemables: [Voucher]
}