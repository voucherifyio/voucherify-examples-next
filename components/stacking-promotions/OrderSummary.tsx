import { Product, Voucher } from "../../pages/types";
import styles from "../../styles/OrderSummary/OrderSummary.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { sumTotalPrice } from "../../utils/sumTotalPrice";
import { ChangeEvent, FormEvent } from "react";
import { VouchersProperties } from "../../pages/types";
import { saveCartAndVoucherInSessionStorage } from "../../utils/stacking-promotions/sessionStorage";

type Props = {
  currentProducts: Product[];
  setVoucherCodeValue: (voucherCodeValue: string) => void;
  voucherCodeValue: string;
  vouchersProperties: VouchersProperties;
  error: string;
  onInputError: (inputError: string) => void;
  inputError: string;
  redeemables: Voucher[];
  onVoucherCodeSubmit: (
    currentProducts: Product[],
    voucherCodeValue: string,
    redeemables: Voucher[]
  ) => Promise<void>;
};

const OrderSummary = ({
  currentProducts,
  setVoucherCodeValue,
  voucherCodeValue,
  vouchersProperties,
  error,
  onInputError,
  inputError,
  redeemables,
  onVoucherCodeSubmit,
}: Props) => {
  const router = useRouter();

  const setVoucherCode = (e: ChangeEvent) => {
    setVoucherCodeValue((e.target as HTMLInputElement).value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentProducts.reduce((a, b) => a + b.quantity, 0) <= 0) {
      alert("Please add items to basket");
    }
    if (!voucherCodeValue) {
      onInputError("Please enter voucher code");
      return;
    }
    await onVoucherCodeSubmit(currentProducts, voucherCodeValue, redeemables);
  };

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
          {vouchersProperties?.redeemables?.map((voucher: Voucher) => {
            return (
              <div key={voucher.id} className={styles.promotionHolder}>
                <h5>
                  {voucher.object === "promotion_tier"
                    ? "Promotion tier"
                    : voucher.id}
                </h5>
                <div>
                  {voucher.id === "FREE-SHIPPING"
                    ? "Free shipping"
                    : `$${(
                        voucher?.order!.total_applied_discount_amount / 100
                      ).toFixed(2)}`}
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
          <span className={styles.allDiscounts}>
            {vouchersProperties?.allDiscount
              ? `$${(
                  (vouchersProperties?.allDiscount -
                    vouchersProperties?.itemsDiscountAmount) /
                    100 || vouchersProperties?.allDiscount / 100
                ).toFixed(2)}`
              : "n/a"}
          </span>
        </h4>
        <h4>
          Grand total:
          <span id={styles.grandTotal}>
            $
            {vouchersProperties?.redeemables
              ? (
                  vouchersProperties?.redeemables?.at(-1)?.order!
                    ?.total_amount / 100
                ).toFixed(2)
              : sumTotalPrice(currentProducts)}
          </span>
        </h4>
      </div>
      <button
        className={styles.checkoutButton}
        onClick={(e) => {
          if (currentProducts.reduce((a, b) => a + b.quantity, 0) <= 0) {
            e.preventDefault();
            alert("Please validate voucher code or add items to basket");
            return false;
          }
          saveCartAndVoucherInSessionStorage(
            vouchersProperties,
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

export default OrderSummary;
