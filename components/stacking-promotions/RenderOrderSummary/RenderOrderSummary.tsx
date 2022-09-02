import { EachProduct, Voucher } from "../../../pages/types";
import styles from "../../../styles/RenderOrderSummary/RenderOrderSummary.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { sumTotalPrice } from "../../../utils/sumTotalPrice";
import { ChangeEvent } from "react";
import { VouchersProperties } from "../../../pages/types";
import { saveCartAndVoucherInSessionStorage } from "../../../utils/stacking-promotions/sessionStorage";

type Props = {
  currentProducts: EachProduct[];
  setVoucherCodeValue: (voucherCodeValue: string) => void;
  voucherCodeValue: string;
  setVouchersProperties: (vouchersProperties: VouchersProperties) => void;
  vouchersProperties: VouchersProperties;
  error: string;
  setInputError: (inputError: string) => void;
  inputError: string;
  redeemables: Voucher[];
  validatePromotionTier: (
    currentProducts: EachProduct[],
    voucherCodeValue: string,
    redeemables: Voucher[]
  ) => unknown;
};

const RenderOrderSummary = ({
  currentProducts,
  setVoucherCodeValue,
  voucherCodeValue,
  vouchersProperties,
  error,
  setInputError,
  inputError,
  validatePromotionTier,
  redeemables
}: Props) => {

  const router = useRouter();

  const getInputValue = (e: ChangeEvent) => {
    setVoucherCodeValue((e.target as HTMLInputElement).value);
  };

  console.log(error);
  return (
    <div className={styles.orderSummary}>
      <h2>Order summary</h2>
      <div className={styles.totalOrderWrapper}>
        <h4>
          Subtotal:
          <span>
            $
            {vouchersProperties?.itemsDiscountAmount
              ? (
                  (vouchersProperties?.amount -
                    vouchersProperties?.itemsDiscountAmount) /
                  100
                ).toFixed(2)
              : sumTotalPrice(currentProducts)}
          </span>
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
            onSubmit={async (e) => {
              if (currentProducts.reduce((a, b) => a + b.quantity, 0) <= 0) {
                alert("Please add items to basket");
              }
              if (!voucherCodeValue) {
                e.preventDefault();
                setInputError("Please enter voucher code");
                return;
              }
              e.preventDefault();
              await validatePromotionTier(
                currentProducts,
                voucherCodeValue,
                redeemables
              );
            }}
          >
            <input
              type="text"
              placeholder="Enter your code"
              id={styles.voucherCode}
              value={voucherCodeValue}
              onChange={(e) => getInputValue(e)}
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
          {vouchersProperties?.redeemables?.map((voucher: Voucher) => {
            return (
              <div key={voucher.id} className={styles.promotionHolder}>
                <h5>
                  {voucher.object === "promotion_tier"
                    ? "Promotion tier"
                    : voucher.id}
                </h5>
                <div>
                  $
                  {(
                    voucher?.order!.total_applied_discount_amount / 100
                  ).toFixed(2)}
                </div>
              </div>
            );
          })}
          {error && (
            <div className={styles.promotionError}>
              <h5>{error}</h5>
            </div>
          )}
        </div>
        <h4 className={styles.discountPriceHolder}>
          All Your Discounts:
          <span id={styles.allDiscounts}>
            {vouchersProperties?.allDiscount
              ? `$${(vouchersProperties?.allDiscount / 100).toFixed(2)}`
              : "n/a"}
          </span>
        </h4>
        <h4>
          Grand total:
          <span id={styles.grandTotal}>
            $
            {vouchersProperties
              ? (
                  vouchersProperties?.redeemables?.at(-1)?.order!
                    ?.total_amount / 100
                ).toFixed(2)
              : sumTotalPrice(currentProducts)}
          </span>
        </h4>
      </div>
      <button
        id={styles.checkoutButton}
        onClick={(e) => {
          if (currentProducts.reduce((a, b) => a + b.quantity, 0) <= 0) {
            e.preventDefault();
            alert("Please validate voucher code or add items to basket");
            return false;
          }
          saveCartAndVoucherInSessionStorage(
            vouchersProperties as VouchersProperties,
            currentProducts
          );
          router.push("/stacking-promotions/Checkout");
        }}
      >
        Checkout
      </button>
    </div>
  );
};

export default RenderOrderSummary;
