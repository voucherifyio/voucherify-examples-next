import { GetStaticProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { MetaProperties } from "../../components/MetaProperties/Meta";
import { defaultProducts } from "../../utils/defaultProducts";
import {
  Product,
  VouchersProperties,
  Voucher,
  Products,
} from "../../components/types";
import styles from "../../styles/CartAndCheckout.module.css";
import Nav from "../../components/Nav/Nav";
import Link from "next/link";
import RenderCartPreview from "../../components/tiered-cart-promotions/CartPreview";
import OrderSummary from "../../components/tiered-cart-promotions/OrderSummary";
import { getCartAndVoucherFromSessionStorage } from "../../utils/tiered-cart-promotions/sessionStorage";
import Footer from "../../components/Footer/Footer";
import { removeDuplicatedPromoObjects } from "../../utils/removeDuplicatePromo";
import { filterZeroQuantityProducts } from "../../utils/filterZeroQuantityProducts";

type Props = {
  products: Products;
};

const Cart = ({ products }: Props) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [vouchersProperties, setVouchersProperties] =
    useState<VouchersProperties>();
  const [redeemables, setRedeemables] = useState<Voucher[]>([]);
  const [error, setError] = useState<string>("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const { storageProducts, vouchersProperties } =
      getCartAndVoucherFromSessionStorage();
    setCurrentProducts(storageProducts || products);
    if (vouchersProperties?.redeemables?.length) {
      setVouchersProperties(vouchersProperties);
      setRedeemables(vouchersProperties.redeemables);
    }
  }, [products]);

  const validatePromotion = useCallback(async (currentProducts: Product[]) => {
    const { filteredProducts } = filterZeroQuantityProducts(currentProducts);
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        `/api/tiered-cart-promotions/validatePromotion`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filteredProducts }),
      }
    );
    const data = await response.json();
    console.log(data)
    setVouchersProperties(data);
  }, []);

  return (
    <>
      <MetaProperties
        title={"Tiered cart promotions"}
        description={"Cart shop"}
        keywords={"example, voucherify, cart shop"}
      />
      <div className={styles.pageWrapper}>
        <Nav />
        <Link href="/">
          <a className={styles.welcomePage}>&#8592; Back to welcome page</a>
        </Link>
        <h2>Your cart</h2>
        <section className={styles.cartAndSummaryWrapper}>
          <RenderCartPreview
            currentProducts={currentProducts}
            setCurrentProducts={setCurrentProducts}
            redeemables={redeemables}
            onProductsQuantityChange={validatePromotion}
          />
          <OrderSummary
            vouchersProperties={vouchersProperties}
            currentProducts={currentProducts}
            error={error}
          />
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Cart;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      products: defaultProducts,
    },
  };
};
