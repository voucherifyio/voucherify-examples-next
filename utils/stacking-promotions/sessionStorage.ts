import { VouchersProperties } from "../../pages/types";
import { EachProduct } from "../../pages/types";

export const saveCartAndVoucherInSessionStorage = (
  vouchersProperties: VouchersProperties,
  products: EachProduct[]
) => {
  window.sessionStorage.setItem(
    "sp-vouchersProperties",
    JSON.stringify(vouchersProperties)
  );
  window.sessionStorage.setItem("sp-products", JSON.stringify(products));
};

export const getCartAndVoucherFromSessionStorage = () => {
  const productsFromSessionStorage = JSON.parse(
    sessionStorage.getItem("sp-products") || "[]"
  );
  const vouchersPropertiesFromSessionStorage = JSON.parse(
    sessionStorage.getItem("sp-vouchersProperties") || "{}"
  );
  return {
    storageProducts:
      productsFromSessionStorage.length && productsFromSessionStorage,
    vouchersProperties:
      vouchersPropertiesFromSessionStorage.length &&
      vouchersPropertiesFromSessionStorage,
  };
};
