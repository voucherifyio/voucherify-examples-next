import { VoucherProperties } from "../../components/voucher-code-redemption/OrderSummary/types";
import { Product } from "../../pages/types";

export const saveCartAndVoucherInSessionStorage = (
  voucherProperties: VoucherProperties,
  products: Product[]
) => {
  window.sessionStorage.setItem(
    "vcr-voucherProperties",
    JSON.stringify(voucherProperties)
  );
  window.sessionStorage.setItem("vcr-products", JSON.stringify(products));
};

export const getCartAndVoucherFromSessionStorage = () => {
  const productsFromSessionStorage: Product[] = JSON.parse(
    sessionStorage.getItem("vcr-products") || "[]"
  );
  const voucherPropertiesFromSessionStorage: VoucherProperties = JSON.parse(
    sessionStorage.getItem("vcr-voucherProperties") || "{}"
  );
  return {
    storageProducts:
      productsFromSessionStorage.length && productsFromSessionStorage,
    voucherProperties:
      voucherPropertiesFromSessionStorage.code &&
      voucherPropertiesFromSessionStorage,
  };
};
