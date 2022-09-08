import styles from "../../styles/CartAndCheckout.module.css";
import { Product, Products, Voucher, VouchersProperties } from "../types";
import { defaultProducts } from "../../utils/defaultProducts";
import { useEffect, useState } from "react";
import { MetaProperties } from "../../components/MetaProperties/Meta";
import Nav from "../../components/Nav/Nav";
import Link from "next/link";
import Footer from "../../components/Footer/Footer";
import RenderCartPreview from "../../components/stacking-promotions/CartPreview";
import { getCartAndVoucherFromSessionStorage } from "../../utils/stacking-promotions/sessionStorage";
import OrderSummary from "../../components/stacking-promotions/OrderSummary";
import { filterZeroQuantityProducts } from "../../utils/filterZeroQuantityProducts";
import { filterPromotionTierFromVouchers } from "../../utils/filterPromotionTierFromVouchers";
import { GetStaticProps } from "next";

const Cart = ({ products }: Products) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
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
    setCurrentProducts(storageProducts || products);
    if (vouchersProperties?.redeemables?.length) {
      setVouchersProperties(vouchersProperties);
      setRedeemables(vouchersProperties.redeemables);
    }
  }, [products]);

  const validateVouchers = async (
    currentProducts: Product[],
    voucherCodeValue: string,
    redeemables: Voucher[]
  ) => {
    const vouchersWithoutDuplicatedPromoTiers = await validatePromotionTier(
      currentProducts,
      redeemables
    );
    await validateStackable(
      currentProducts,
      voucherCodeValue,
      vouchersWithoutDuplicatedPromoTiers
    );
  };

  const validatePromotionTier = async (
    currentProducts: Product[],
    redeemables: Voucher[]
  ) => {
    setIsActive(true);
    const vouchersWithoutDuplicatedPromoTiers =
      filterPromotionTierFromVouchers(redeemables);
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
      vouchersWithoutDuplicatedPromoTiers?.unshift({ object: object, id: id });
      setIsActive(false);
      return vouchersWithoutDuplicatedPromoTiers;
    }
    return data;
  };

  const validateStackable = async (
    currentProducts: Product[],
    voucherCodeValue: string,
    vouchersWithoutDuplicatedPromoTiers: Voucher[]
  ) => {
    if (
      currentProducts.reduce((a, b) => a + b.quantity, 0) <= 0 ||
      !vouchersWithoutDuplicatedPromoTiers.length
    ) {
      setVouchersProperties(undefined);
      setRedeemables([]);
      setIsActive(false);
      return;
    }
    const { filteredProducts } = filterZeroQuantityProducts(currentProducts);
    const newVouchers = [...vouchersWithoutDuplicatedPromoTiers];
    voucherCodeValue &&
      newVouchers?.push({ object: "voucher", id: voucherCodeValue });
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
          redeemables: newVouchers,
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
    setInputError("");
    setError("");
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
            redeemables={redeemables}
            isActive={isActive}
            onProductsQuantityChange={validateVouchers}
          />
          <OrderSummary
            currentProducts={currentProducts}
            setVoucherCodeValue={setVoucherCodeValue}
            voucherCodeValue={voucherCodeValue}
            vouchersProperties={vouchersProperties}
            error={error}
            onInputError={setInputError}
            inputError={inputError}
            redeemables={redeemables}
            onVoucherCodeSubmit={validateVouchers}
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
