import styles from "../../styles/CartAndCheckout.module.css";
import { EachProduct, Products, Voucher } from "../types";
import { defaultProducts } from "../../utils/defaultProducts";
import { useEffect, useState } from "react";
import { MetaProperties } from "../../components/MetaProperties/Meta";
import Nav from "../../components/Nav/Nav";
import Link from "next/link";
import Footer from "../../components/Footer/Footer";
import RenderCartPreview from "../../components/stacking-promotions/RenderCartPreview/RenderCartPreview";
import { getCartAndVoucherFromSessionStorage } from "../../utils/stacking-promotions/sessionStorage";
import RenderOrderSummary from "../../components/stacking-promotions/RenderOrderSummary/RenderOrderSummary";
import { filterZeroQuantityProducts } from "../../utils/filterZeroQuantityProducts";
import { VouchersProperties } from "../types";
import { filterPromotionTierFromVouchers } from "../../utils/filterPromotionTierFromVouchers";

const Cart = ({ products }: Products) => {
  const [currentProducts, setCurrentProducts] = useState<EachProduct[]>([]);
  const [voucherCodeValue, setVoucherCodeValue] = useState<string>("");
  const [vouchersProperties, setVouchersProperties] =
    useState<VouchersProperties>();
  const [redeemables, setRedeemables] = useState<Voucher[]>([]);
  const [error, setError] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const { storageProducts, vouchersProperties } =
      getCartAndVoucherFromSessionStorage();
    storageProducts
      ? setCurrentProducts(storageProducts)
      : setCurrentProducts(products);
    vouchersProperties && setVouchersProperties(vouchersProperties);
  }, [products]);

  const validatePromotionTier = async (
    currentProducts: EachProduct[],
    voucherCodeValue: string,
    redeemables: Voucher[]
  ) => {
    setIsActive(true);
    if (currentProducts.reduce((a, b) => a + b.quantity, 0) <= 0) {
      setVouchersProperties(undefined);
      setRedeemables([]);
      setIsActive(false);
      return;
    }
    redeemables = filterPromotionTierFromVouchers(redeemables);
    const { filteredProducts } = filterZeroQuantityProducts(currentProducts);
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        `/api/stacking-promotions/validatePromotions`,
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
    if (data.length) {
      const { object, id } = await data[0];
      redeemables.unshift({ object: object, id: id });
    } else {
      setIsActive(false);
      return;
    }
    await validateStackable(currentProducts, voucherCodeValue, redeemables);
    setIsActive(false);
  };

  const validateStackable = async (
    currentProducts: EachProduct[],
    voucherCodeValue: string,
    redeemables: Voucher[]
  ) => {
    const { filteredProducts } = filterZeroQuantityProducts(currentProducts);
    voucherCodeValue &&
      redeemables.push({ object: "voucher", id: voucherCodeValue });
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        "/api/stacking-promotions/validateStackable",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          redeemables,
          filteredProducts,
        }),
      }
    );
    const data = await response.json();
    if (response.status !== 200) {
      setError(data.message);
      setVoucherCodeValue("");
      return;
    }
    if (data?.redeemables) {
      setRedeemables([
        ...data.redeemables?.map((voucher: Voucher) => {
          return {
            object: voucher.object,
            id: voucher.id,
          };
        }),
      ]);
    }

    setVouchersProperties(data);
    setVoucherCodeValue("");
    setError("");
    return data;
  };

  return (
    <>
      <MetaProperties
        title={"Stacking promotions"}
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
            validatePromotionTier={validatePromotionTier}
            redeemables={redeemables}
            isActive={isActive}
          />
          <RenderOrderSummary
            currentProducts={currentProducts}
            setVoucherCodeValue={setVoucherCodeValue}
            voucherCodeValue={voucherCodeValue}
            setVouchersProperties={setVouchersProperties}
            vouchersProperties={vouchersProperties as VouchersProperties}
            error={error}
            setInputError={setInputError}
            inputError={inputError}
            redeemables={redeemables}
            validatePromotionTier={validatePromotionTier}
          />
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Cart;

export const getStaticProps = async () => {
  return {
    props: {
      products: defaultProducts,
    },
  };
};
