import styles from "../../../styles/OrderSummary/OrderSummary.module.css";
import Image from "next/image";
import { sumTotalPrice } from "../../../utils/sumTotalPrice";
import { Product } from "../../../pages/types";
import { ChangeEvent, FormEvent, useState } from "react";
import { VoucherProperties } from "./types";
import { useRouter } from "next/router";
import { saveCartAndVoucherInSessionStorage } from "../../../utils/voucher-code-redemption/sessionStorage";

type Props = {
  currentProducts: Product[];
  setVoucherCodeValue: (voucherCodeValue: string) => void;
  voucherCodeValue: string;
  voucherProperties: VoucherProperties;
  error: string;
  setInputError: (inputError: string) => void;
  inputError: string;
  validateVoucher: (
    voucherCodeValue: string,
    currentProducts: Product[]
  ) => unknown;
};

const OrderSummary = ({
  currentProducts,
  setVoucherCodeValue,
  voucherCodeValue,
  voucherProperties,
  error,
  setInputError,
  inputError,
  validateVoucher,
}: Props) => {
  const router = useRouter();

  const setVoucherCode = (e: ChangeEvent) => {
    setVoucherCodeValue((e.target as HTMLInputElement).value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentProducts.reduce((a, b) => a + b.quantity, 0) <= 0) {
      alert("Please add items to basket");
    }
    if (!voucherCodeValue) {
      setInputError("Please enter voucher code");
      return false;
    }
    validateVoucher(voucherCodeValue as string, currentProducts);
  };

  const sumTotalPriceWithDiscount = (
    voucherProperties: VoucherProperties,
    currentProducts: Product[]
  ) => {
    const promotions = voucherProperties?.discount / 100 || 0;
    const totalPrice = sumTotalPrice(currentProducts);
    const totalPriceWithDiscount = parseFloat(totalPrice) - promotions;
    return totalPriceWithDiscount <= 0 ? 0 : totalPriceWithDiscount;
  };

  return (
    <div className={styles.orderSummary}>
      <h2>Order summary</h2>
      <div className={styles.totalOrderWrapper}>
        <h4>
          Subtotal:<span>${sumTotalPrice(currentProducts)}</span>
        </h4>
        <h4>
          Shipping:<span>Calculated at next step</span>
        </h4>
        <h4>Coupon codes:</h4>
        <div className={styles.voucherExamples}>
          <span>BLCKFRDY ($10.00)</span>
          <span>FREE-SHIPPING (Free shipping)</span>
        </div>
        <div className={styles.voucherCodeFormWrapper}>
          <form
            className={styles.voucherCodeForm}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              type="text"
              placeholder="Enter your code"
              id={styles.voucherCode}
              value={voucherCodeValue}
              onChange={(e) => setVoucherCode(e)}
            />
            <button id={styles.checkVoucherCode}>
              <Image
                src="/rightArrow.svg"
                alt="Submit arrow"
                width="100%"
                height="60%"
              />
            </button>
          </form>
        </div>
        <div className={styles.voucherFormErrorWrapper}>
          <p>{inputError}</p>
        </div>
        <div className={styles.promotionsWrapper}>
          <h4>Promotions:</h4>
          {voucherProperties?.code && (
            <div className={styles.promotionHolder}>
              <h5>{voucherProperties?.code}</h5>
              <div>{`${
                voucherProperties.discount
                  ? `$${(voucherProperties?.discount / 100).toFixed(2)}`
                  : "Free shipping"
              }`}</div>
            </div>
          )}
          {error && (
            <div className={styles.promotionError}>
              <h5>{error}</h5>
            </div>
          )}
        </div>
        <h4 className={styles.discountPriceHolder}>
          All Your Discounts:
          <span id={styles.allDiscounts}>{`${
            voucherProperties?.discount
              ? `$${(voucherProperties.discount / 100).toFixed(2)}`
              : "n/a"
          }`}</span>
        </h4>
        <h4>
          Grand total:
          <span id={styles.grandTotal}>
            $
            {sumTotalPriceWithDiscount(
              voucherProperties as VoucherProperties,
              currentProducts
            ).toFixed(2)}
          </span>
        </h4>
      </div>
      <button
        id={styles.checkoutButton}
        onClick={(e) => {
          if (
            !voucherProperties?.code ||
            currentProducts.reduce((a, b) => a + b.quantity, 0) <= 0
          ) {
            e.preventDefault();
            alert("Please validate voucher code or add items to basket");
            return false;
          }
          saveCartAndVoucherInSessionStorage(
            voucherProperties as VoucherProperties,
            currentProducts
          );
          router.push("/voucher-code-redemption/Checkout");
        }}
      >
        Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
