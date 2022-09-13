import styles from "../../styles/OrderSummary/OrderSummary.module.css";
import { VouchersProperties, Product, Voucher } from "../types";
import Image from "next/image";
import { saveCartAndVoucherInSessionStorage } from "../../utils/tiered-cart-promotions/sessionStorage";
import { useRouter } from "next/router";
import { sumTotalPrice } from "../../utils/sumTotalPrice";

type Props = {
  vouchersProperties: VouchersProperties;
  currentProducts: Product[];
  error: string;
};

const OrderSummary = ({
  vouchersProperties,
  currentProducts,
  error
}: Props) => {
  const router = useRouter();
console.log(vouchersProperties)
  return (
    <div className={styles.orderSummary}>
      <h2>Order summary</h2>
      <div className={styles.totalOrderWrapper}>
        <h4>
          Subtotal:
          <span>
            ${sumTotalPrice(currentProducts)}
            {/* {vouchersProperties?.itemsDiscountAmount
              ? (
                  (vouchersProperties?.amount -
                    vouchersProperties?.itemsDiscountAmount) /
                  100
                ).toFixed(2)
              : sumTotalPrice(currentProducts)} */}
          </span>
        </h4>
        <h4>
          Shipping:<span>Calculated at next step</span>
        </h4>
        <div className={styles.voucherExamples}>
          <span>In this case validating voucher is disabled.</span>
        </div>
        <div className={styles.voucherCodeFormWrapper}>
          <form className={styles.voucherCodeForm}>
            <input
              type="text"
              placeholder="Enter your code"
              id={styles.voucherCode}
            />
            <button id={styles.checkVoucherCode} disabled={true}>
              <Image
                src="/rightArrow.svg"
                alt="Submit arrow"
                width="100%"
                height="60%"
              />
            </button>
          </form>
        </div>
        <div className={styles.voucherFormErrorWrapper}></div>
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
            {/* {vouchersProperties?.allDiscount
              ? `$${(
                  (vouchersProperties?.allDiscount -
                    vouchersProperties?.itemsDiscountAmount) /
                    100 || vouchersProperties?.allDiscount / 100
                ).toFixed(2)}`
              : "n/a"} */}
          </span>
        </h4>
        <h4>
          Grand total:
          <span id={styles.grandTotal}>
            $
            {/* {vouchersProperties?.redeemables
              ? (
                  vouchersProperties?.redeemables?.at(-1)?.order!
                    ?.total_amount / 100
                ).toFixed(2)
              : sumTotalPrice(currentProducts)} */}
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
