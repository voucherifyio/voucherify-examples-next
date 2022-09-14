import { GetStaticProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { MetaProperties } from "../../components/MetaProperties/Meta";
import { defaultProducts } from "../../utils/defaultProducts";
import { Product, Products, PromotionTier } from "../../components/types";
import styles from "../../styles/CartAndCheckout.module.css";
import Nav from "../../components/Nav/Nav";
import Link from "next/link";
import RenderCartPreview from "../../components/tiered-cart-promotions/CartPreview";
import OrderSummary from "../../components/tiered-cart-promotions/OrderSummary";
import { getCartAndVoucherFromSessionStorage } from "../../utils/tiered-cart-promotions/sessionStorage";
import Footer from "../../components/Footer/Footer";
import { filterZeroQuantityProducts } from "../../utils/filterZeroQuantityProducts";

type Props = {
  products: Products;
};

const Cart = ({ products }: Props) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [vouchersProperties, setVouchersProperties] = useState<PromotionTier[]>(
    []
  );
  const [error, setError] = useState<string>("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const { storageProducts, vouchersProperties } =
      getCartAndVoucherFromSessionStorage();
    setCurrentProducts(storageProducts || products);
    vouchersProperties && setVouchersProperties(vouchersProperties);
  }, [products]);

  const validatePromotion = async (currentProducts: Product[]) => {
    setIsActive(true);
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
    setVouchersProperties(data);
    setIsActive(false);
  };

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
            onProductsQuantityChange={validatePromotion}
            isActive={isActive}
            vouchersProperties={vouchersProperties}
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
