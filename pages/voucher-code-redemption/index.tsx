import styles from "../../styles/CartAndCheckout.module.css";
import Nav from "../../components/Nav/Nav";
import Link from "next/link";
import { MetaProperties } from "../../components/MetaProperties/Meta";
import RenderCartPreview from "../../components/voucher-code-redemption/CartPreview";
import { Product, Products } from "../types";
import { GetStaticProps } from "next";
import OrderSummary from "../../components/voucher-code-redemption/OrderSummary/OrderSummary";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { getCartAndVoucherFromSessionStorage } from "../../utils/voucher-code-redemption/sessionStorage";
import { VoucherProperties } from "../../components/voucher-code-redemption/OrderSummary/types";
import { filterZeroQuantityProducts } from "../../utils/filterZeroQuantityProducts";
import { defaultProducts } from "../../utils/defaultProducts";

const Cart = ({ products }: Products) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [voucherCodeValue, setVoucherCodeValue] = useState<string>("");
  const [voucherProperties, setVoucherProperties] =
    useState<VoucherProperties>();
  const [error, setError] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  useEffect(() => {
    const { storageProducts, voucherProperties } =
      getCartAndVoucherFromSessionStorage();
    setCurrentProducts(storageProducts || products);
    voucherProperties && setVoucherProperties(voucherProperties);
  }, [products]);

  const validateVoucher = async (
    voucherCode: string,
    currentProducts: Product[]
  ) => {
    if (currentProducts.reduce((a, b) => a + b.quantity, 0) <= 0) return;
    const { filteredProducts } = filterZeroQuantityProducts(currentProducts);
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        `/api/voucher-code-redemption/validateVoucher`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voucherCode, filteredProducts }),
      }
    );
    const data = await response.json();
    if (response.status !== 200) {
      setError(data.error);
      setVoucherCodeValue("");
      setInputError("");
      return;
    }

    setError("");
    setVoucherProperties(data);
    setVoucherCodeValue("");
    setInputError("");
    return data;
  };

  return (
    <>
      <MetaProperties
        title={"Voucher code redemption"}
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
            setVoucherCodeValue={setVoucherCodeValue}
            voucherProperties={voucherProperties as VoucherProperties}
            onProductsQuantityChange={validateVoucher}
          />
          <OrderSummary
            currentProducts={currentProducts}
            setVoucherCodeValue={setVoucherCodeValue}
            voucherCodeValue={voucherCodeValue}
            voucherProperties={voucherProperties as VoucherProperties}
            error={error}
            onInputError={setInputError}
            inputError={inputError}
            onVoucherCodeSubmit={validateVoucher}
          />
        </section>
        <Footer />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      products: defaultProducts,
    },
  };
};

export default Cart;
