import styles from "../../styles/Cart.module.css";
import Nav from "../../components/Nav/Nav";
import Link from "next/link";
import { MetaProperties } from "../../components/MetaProperties/Meta";
import RenderCartPreview from "../../components/voucher-code-redemption/RenderCartPreview/RenderCartPreview";
import { EachProduct, Products } from "./types";
import { GetStaticProps } from "next";
import RenderOrderSummary from "../../components/voucher-code-redemption/RenderOrderSummary/RenderOrderSummary";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";

const Cart = ({ products }: Products) => {
  const [currentProducts, setCurrentProducts] =
    useState<EachProduct[]>(products);

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
          />
          <RenderOrderSummary currentProducts={currentProducts} />
        </section>
        <Footer />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/voucher-code-redemption/defaultProducts`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  });
  const defaultProducts = await response.json();
  return {
    props: {
      products: defaultProducts
    }
  }
}

export default Cart;
