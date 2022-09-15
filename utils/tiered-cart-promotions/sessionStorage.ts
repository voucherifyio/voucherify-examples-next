import { Product, PromotionTier } from "../../components/types";

export const saveCartAndVoucherInSessionStorage = (
  vouchersProperties: PromotionTier[],
  products: Product[]
) => {
  window.sessionStorage.setItem(
    "tcp-vouchersProperties",
    JSON.stringify(vouchersProperties)
  );
  window.sessionStorage.setItem("tcp-products", JSON.stringify(products));
};

export const getCartAndVoucherFromSessionStorage = () => {
  const productsFromSessionStorage: Product[] = JSON.parse(
    sessionStorage.getItem("tcp-products") || "[]"
  );
  const voucherPropertiesFromSessionStorage: PromotionTier[] = JSON.parse(
    sessionStorage.getItem("tcp-vouchersProperties") || "[]"
  );
  return {
    storageProducts:
      productsFromSessionStorage.length && productsFromSessionStorage,
    vouchersProperties:
      voucherPropertiesFromSessionStorage.length &&
      voucherPropertiesFromSessionStorage,
  };
};
