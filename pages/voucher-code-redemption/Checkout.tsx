import { useEffect, useState } from "react";
import FormPreview from "../../components/voucher-code-redemption/FormPreview/FormPreview";
import { MetaProperties } from "../../components/MetaProperties/Meta";
import CheckoutSummary from "../../components/voucher-code-redemption/CheckoutSummary/CheckoutSummary";
import { VoucherProperties } from "../../components/voucher-code-redemption/RenderOrderSummary/types";
import styles from "../../styles/CartAndCheckout.module.css";
import { getCartAndVoucherFromSessionStorage } from "../../utils/voucher-code-redemption/sessionStorage";
import { EachProduct } from "../types";

const Checkout = () => {
  const [products, setProducts] = useState<EachProduct[]>([]);
  const [voucherProperties, setVoucherProperties] =
    useState<VoucherProperties>();

  useEffect(() => {
    const { storageProducts: products, voucherProperties } =
      getCartAndVoucherFromSessionStorage();
    setProducts(products);
    setVoucherProperties(voucherProperties);
  }, []);

  return (
    <>
      <MetaProperties
        title={"Voucher code redemption"}
        description={"Checkout view"}
        keywords={"example, voucherify, cart shop"}
      />
      <div className={styles.checkoutPageWrapper}>
        <FormPreview
          products={products}
          voucherProperties={voucherProperties as VoucherProperties}
        />
        <CheckoutSummary
          products={products}
          voucherProperties={voucherProperties as VoucherProperties}
        />
      </div>
    </>
  );
};

export default Checkout;
