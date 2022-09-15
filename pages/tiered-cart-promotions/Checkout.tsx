import { GetStaticProps } from "next";
import { useState } from "react";
import { MetaProperties } from "../../components/MetaProperties/Meta";
import { Product, Products, PromotionTier } from "../../components/types";
import { defaultProducts } from "../../utils/defaultProducts";
import { getCartAndVoucherFromSessionStorage } from "../../utils/tiered-cart-promotions/sessionStorage";
import { useEffect } from "react";
import styles from "../../styles/CartAndCheckout.module.css";
import FormPreview from "../../components/tiered-cart-promotions/FormPreview";
import CheckoutSummary from "../../components/tiered-cart-promotions/CheckoutSummary";

type Props = {
  products: Products;
};

const Checkout = ({ products }: Props) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [vouchersProperties, setVouchersProperties] = useState<PromotionTier[]>(
    []
  );

  useEffect(() => {
    const { storageProducts, vouchersProperties } =
      getCartAndVoucherFromSessionStorage();
    setCurrentProducts(storageProducts || products);
    vouchersProperties && setVouchersProperties(vouchersProperties);
  }, [products]);

  return (
    <>
      <MetaProperties
        title={"Tiered cart promotions"}
        description={"Checkout view"}
        keywords={"example, voucherify, cart shop"}
      />
      <div className={styles.checkoutPageWrapper}>
        <FormPreview
          currentProducts={currentProducts}
          vouchersProperties={vouchersProperties}
        />
        <CheckoutSummary currentProducts={currentProducts}
          vouchersProperties={vouchersProperties}/>
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
