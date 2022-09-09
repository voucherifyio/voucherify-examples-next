import { useEffect, useState } from "react";
import FormPreview from "../../components/voucher-code-redemption/FormPreview";
import { MetaProperties } from "../../components/MetaProperties/Meta";
import CheckoutSummary from "../../components/voucher-code-redemption/CheckoutSummary";
import { VoucherProperties } from "../../components/voucher-code-redemption/OrderSummary/types";
import styles from "../../styles/CartAndCheckout.module.css";
import { getCartAndVoucherFromSessionStorage } from "../../utils/voucher-code-redemption/sessionStorage";
import { Product, Products } from "../types";
import { GetStaticProps } from "next";
import { defaultProducts } from "../../utils/defaultProducts";

type Props = {
  products: Products;
};

const Checkout = ({ products }: Props) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [voucherProperties, setVoucherProperties] =
    useState<VoucherProperties>();

  useEffect(() => {
    const { storageProducts, voucherProperties } =
      getCartAndVoucherFromSessionStorage();
    setCurrentProducts(storageProducts || products);
    setVoucherProperties(voucherProperties as VoucherProperties);
  }, [products]);

  return (
    <>
      <MetaProperties
        title={"Voucher code redemption"}
        description={"Checkout view"}
        keywords={"example, voucherify, cart shop"}
      />
      <div className={styles.checkoutPageWrapper}>
        <FormPreview
          currentProducts={currentProducts}
          voucherProperties={voucherProperties as VoucherProperties}
        />
        <CheckoutSummary
          currentProducts={currentProducts}
          voucherProperties={voucherProperties as VoucherProperties}
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
