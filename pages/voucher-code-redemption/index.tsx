import styles from "../../styles/CartAndCheckout.module.css";
import Nav from "../../components/Nav/Nav";
import Link from "next/link";
import { MetaProperties } from "../../components/MetaProperties/Meta";
import RenderCartPreview from "../../components/voucher-code-redemption/RenderCartPreview/RenderCartPreview";
import { EachProduct, Products } from "./types";
import { GetStaticProps } from "next";
import RenderOrderSummary from "../../components/voucher-code-redemption/RenderOrderSummary/RenderOrderSummary";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { getCartAndVoucherFromSessionStorage } from "../../utils/localStorage";
import { VoucherProperties } from "../../components/voucher-code-redemption/RenderOrderSummary/types";
import { filterZeroQuantityProducts } from "../../utils/filterZeroQuantityProducts";
import { defaultProducts } from "../../utils/defaultProducts";

const Cart = ({ products }: Products) => {
  const [currentProducts, setCurrentProducts] = useState<EachProduct[]>([]);
  const [voucherCodeValue, setVoucherCodeValue] = useState<string>("");
  const [voucherProperties, setVoucherProperties] =
    useState<VoucherProperties>();
  const [error, setError] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  useEffect(() => {
    const { storageProducts, voucherProperties } =
      getCartAndVoucherFromSessionStorage();
    storageProducts
      ? setCurrentProducts(storageProducts)
      : setCurrentProducts(products);
    voucherProperties && setVoucherProperties(voucherProperties);
  }, [products]);

  const validateVoucher = async (
    voucherCode: string,
    currentProducts: EachProduct[]
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
            validateVoucher={validateVoucher}
          />
          <RenderOrderSummary
            currentProducts={currentProducts}
            setVoucherCodeValue={setVoucherCodeValue}
            voucherCodeValue={voucherCodeValue}
            setVoucherProperties={setVoucherProperties}
            voucherProperties={voucherProperties as VoucherProperties}
            setError={setError}
            error={error}
            setInputError={setInputError}
            inputError={inputError}
            validateVoucher={validateVoucher}
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
