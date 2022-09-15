import { Product, PromotionTier } from "../types";
import styles from "../../styles/Discounts.module.css";
import { sumTotalPrice } from "../../utils/sumTotalPrice";

type Props = {
  currentProducts: Product[];
  vouchersProperties: PromotionTier[];
};

const Discounts = ({ currentProducts, vouchersProperties }: Props) => {
  const promotions =
    vouchersProperties?.reduce(
      (sum, tier) => sum + tier.total_applied_discount_amount,
      0
    ) / 100 || 0;

  return (
    <div className={styles.discounts}>
      <div className={styles.discountTitle}>
        <p>Discount applied to cart</p>
      </div>
      <div className={styles.vouchers}>
        {vouchersProperties?.map((tier) => {
          return (
            <h5 key={tier.id} className={styles.voucher}>
              <span>{tier.name}</span>
            </h5>
          );
        })}
      </div>
      <div className={styles.valueProp}>
        <p>Value</p>
        <span>${promotions}</span>
      </div>
      <div className={styles.summedPrices}>
        <div className={styles.subtotal}>
          <p>Subtotal</p>
          <span>${(sumTotalPrice(currentProducts)).toFixed(2)}</span>
        </div>
        <div className={styles.allDiscounts}>
          <p>All your discounts</p>
          <span>${promotions}</span>
        </div>
        <div className={styles.shipping}>
          <p>Shipping</p>
          <span>$8.99</span>
        </div>
        <div className={styles.grandTotal}>
          <p>Grand total</p>
          <span>
            ${(sumTotalPrice(currentProducts) - promotions).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
