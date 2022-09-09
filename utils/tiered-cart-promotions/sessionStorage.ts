import { VoucherProperties } from "../../components/voucher-code-redemption/OrderSummary/types";
import { Product } from "../../pages/types";

export const saveCartAndVoucherInSessionStorage = (
  voucherProperties: VoucherProperties,
  products: Product[]
) => {
  window.sessionStorage.setItem(
    "tcp-voucherProperties",
    JSON.stringify(voucherProperties)
  );
  window.sessionStorage.setItem("tcp-products", JSON.stringify(products));
};

export const getCartAndVoucherFromSessionStorage = () => {
  const productsFromSessionStorage = JSON.parse(
    sessionStorage.getItem("tcp-products") || "[]"
  );
  const voucherPropertiesFromSessionStorage = JSON.parse(
    sessionStorage.getItem("tcp-voucherProperties") || "{}"
  );
  return {
    storageProducts:
      productsFromSessionStorage.length && productsFromSessionStorage,
    voucherProperties:
      voucherPropertiesFromSessionStorage &&
      voucherPropertiesFromSessionStorage,
  };
};
