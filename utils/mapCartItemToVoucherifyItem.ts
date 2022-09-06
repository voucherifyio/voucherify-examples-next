import { OrdersItem } from "@voucherify/sdk";

export const mapCartItemToVoucherifyItem = (item: {
  productName: string;
  price: number;
  quantity: number;
}) => ({
  sku_id: item.productName,
  price: item.price,
  quantity: item.quantity,
} as OrdersItem);
