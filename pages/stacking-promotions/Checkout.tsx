import { useState, useEffect } from "react";
import { MetaProperties } from "../../components/MetaProperties/Meta";
import styles from "../../styles/CartAndCheckout.module.css";
import { getCartAndVoucherFromSessionStorage } from "../../utils/stacking-promotions/sessionStorage";
import { EachProduct } from "../types";
import { VouchersProperties } from "../types";
import FormPreview from "../../components/stacking-promotions/FormPreview/FormPreview";
import CheckoutSummary from "../../components/stacking-promotions/CheckoutSummary/CheckoutSummary";

const Checkout = () => {
  const [products, setProducts] = useState<EachProduct[]>([]);
  const [vouchersProperties, setVouchersProperties] =
    useState<VouchersProperties>();

  useEffect(() => {
    const { storageProducts: products, vouchersProperties } =
      getCartAndVoucherFromSessionStorage();
    setProducts(products);
    setVouchersProperties(vouchersProperties);
  }, []);
  return (
    <>
      <MetaProperties
        title={"Stacking promotions"}
        description={"Checkout view"}
        keywords={"example, voucherify, cart shop"}
      />
      <div className={styles.checkoutPageWrapper}>
        <FormPreview
          products={products}
          vouchersProperties={vouchersProperties as VouchersProperties}
        />
        <CheckoutSummary
          products={products}
          vouchersProperties={vouchersProperties as VouchersProperties}
        />
      </div>
    </>
  );
};

export default Checkout;
