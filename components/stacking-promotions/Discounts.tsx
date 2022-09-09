import { Product } from "../types";
import styles from "../../styles/Discounts.module.css";
import { sumTotalPrice } from "../../utils/sumTotalPrice";
import { VouchersProperties } from "../types";

type Props = {
  products: Product[];
  vouchersProperties: VouchersProperties;
};

const Discounts = ({ products, vouchersProperties }: Props) => {
  const sumGrandTotal = (products: Product[]) => {
    const subtotal = sumTotalPrice(products);
    const promotions = vouchersProperties
      ? (vouchersProperties?.allDiscount -
          vouchersProperties?.itemsDiscountAmount) /
          100 || vouchersProperties?.allDiscount / 100 - 20
      : 0;
    const grandTotal = parseFloat(subtotal) - promotions;
    return grandTotal;
  };

  return (
    <div className={styles.discounts}>
      <div className={styles.discountTitle}>
        <p>Discount applied to cart</p>
      </div>
      <div className={styles.vouchers}>
        {vouchersProperties?.redeemables?.map((voucher) => {
          return (
            <h5 key={voucher.id} className={styles.voucher}>
              <span>
                {voucher.object === "promotion_tier"
                  ? "Promotion tier"
                  : voucher.id}
              </span>
            </h5>
          );
        })}
      </div>
      <div className={styles.valueProp}>
        <p>Value</p>
        <span>
          $
          {vouchersProperties &&
            (
              (vouchersProperties?.allDiscount -
                vouchersProperties?.itemsDiscountAmount) /
                100 || vouchersProperties?.allDiscount / 100
            ).toFixed(2)}
        </span>
      </div>
      <div className={styles.summedPrices}>
        <div className={styles.subtotal}>
          <p>Subtotal</p>
          <span>${sumTotalPrice(products)}</span>
        </div>
        <div className={styles.allDiscounts}>
          <p>All your discounts</p>
          <span>
            $
            {vouchersProperties &&
              (
                (vouchersProperties?.allDiscount -
                  vouchersProperties?.itemsDiscountAmount) /
                  100 || vouchersProperties?.allDiscount / 100
              ).toFixed(2)}
          </span>
        </div>
        <div className={styles.shipping}>
          <p>Shipping</p>
          <span>
            {vouchersProperties?.redeemables?.some(
              (voucher) => voucher.id === "FREE-SHIPPING"
            )
              ? "Free shipping"
              : "$20"}
          </span>
        </div>
        <div className={styles.grandTotal}>
          <p>Grand total</p>
          <span>${sumGrandTotal(products).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
