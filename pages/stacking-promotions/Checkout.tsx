import { useState, useEffect } from "react";
import { MetaProperties } from "../../components/MetaProperties/Meta";
import styles from "../../styles/CartAndCheckout.module.css";
import { getCartAndVoucherFromSessionStorage } from "../../utils/stacking-promotions/sessionStorage";
import { Product, Products } from "../types";
import { VouchersProperties } from "../types";
import FormPreview from "../../components/stacking-promotions/FormPreview";
import CheckoutSummary from "../../components/stacking-promotions/CheckoutSummary";
import { GetStaticProps } from "next";
import { defaultProducts } from "../../utils/defaultProducts";

const Checkout = ({ products }: Products) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [vouchersProperties, setVouchersProperties] =
    useState<VouchersProperties>();

  useEffect(() => {
    const { storageProducts, vouchersProperties } =
      getCartAndVoucherFromSessionStorage();
    storageProducts
      ? setCurrentProducts(storageProducts)
      : setCurrentProducts(products);
    setVouchersProperties(vouchersProperties);
  }, [products]);

  return (
    <>
      <MetaProperties
        title={"Stacking promotions"}
        description={"Checkout view"}
        keywords={"example, voucherify, cart shop"}
      />
      <div className={styles.checkoutPageWrapper}>
        <FormPreview
          currentProducts={currentProducts}
          vouchersProperties={vouchersProperties as VouchersProperties}
        />
        <CheckoutSummary
          currentProducts={currentProducts}
          vouchersProperties={vouchersProperties as VouchersProperties}
        />
      </div>
    </>
  );
};

export default Checkout;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      products: defaultProducts,
    },
  };
};
