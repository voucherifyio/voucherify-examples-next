import { Voucher, VouchersProperties } from "../../pages/types";
import { Product } from "../../pages/types";

export const saveCartAndVoucherInSessionStorage = (
  vouchersProperties: VouchersProperties,
  products: Product[]
) => {
  window.sessionStorage.setItem(
    "sp-vouchersProperties",
    JSON.stringify(vouchersProperties)
  );
  window.sessionStorage.setItem("sp-products", JSON.stringify(products));
};

export const getCartAndVoucherFromSessionStorage = () => {
  const productsFromSessionStorage: Product[] = JSON.parse(
    sessionStorage.getItem("sp-products") || "[]"
  );
  const vouchersPropertiesFromSessionStorage: VouchersProperties = JSON.parse(
    sessionStorage.getItem("sp-vouchersProperties") || "{}"
  );
  return {
    storageProducts:
      productsFromSessionStorage.length && productsFromSessionStorage,
    vouchersProperties:
      vouchersPropertiesFromSessionStorage.redeemables &&
      vouchersPropertiesFromSessionStorage,
  };
};
