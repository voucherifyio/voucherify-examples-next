import { VoucherProperties } from "../components/voucher-code-redemption/RenderOrderSummary/types";
import { EachProduct } from "../pages/voucher-code-redemption/types";

export const saveCartAndVoucherInSessionStorage = (
  voucherProperties: VoucherProperties,
  products: EachProduct[]
) => {
  window.sessionStorage.setItem(
    "vcr-voucherProperties",
    JSON.stringify(voucherProperties)
  );
  window.sessionStorage.setItem("vcr-products", JSON.stringify(products));
};

export const getCartAndVoucherFromSessionStorage = () => {
  const productsFromSessionStorage = JSON.parse(
    sessionStorage.getItem("vcr-products") || "[]"
  );
  const voucherPropertiesFromSessionStorage = JSON.parse(
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
