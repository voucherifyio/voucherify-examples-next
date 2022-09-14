import { Product } from "../types";
import styles from "../../styles/Discounts.module.css";
import { sumTotalPrice } from "../../utils/sumTotalPrice";
import { VoucherProperties } from "./OrderSummary/types";

type Props = {
  currentProducts: Product[];
  voucherProperties: VoucherProperties | undefined;
};

const Discounts = ({ currentProducts, voucherProperties }: Props) => {
  const shippingValue = voucherProperties?.code === "FREE-SHIPPING" ? 0 : 20;
  const promotions = voucherProperties?.discount
    ? voucherProperties?.discount / 100
    : 0;

  return (
    <div className={styles.discounts}>
      <div className={styles.discountTitle}>
        <p>Discount applied to cart</p>
      </div>
      <div className={styles.vouchers}>
        <h5 className={styles.voucher}>
          <span>{voucherProperties?.code}</span>
        </h5>
      </div>
      <div className={styles.valueProp}>
        <p>Value</p>
        <span>
          ${voucherProperties?.discount ? voucherProperties?.discount / 100 : 0}
        </span>
      </div>
      <div className={styles.summedPrices}>
        <div className={styles.subtotal}>
          <p>Subtotal</p>
          <span>${sumTotalPrice(currentProducts)}</span>
        </div>
        <div className={styles.allDiscounts}>
          <p>All your discounts</p>
          <span>
            $
            {voucherProperties?.discount
              ? voucherProperties?.discount / 100
              : 0}
          </span>
        </div>
        <div className={styles.shipping}>
          <p>Shipping</p>
          <span>${shippingValue}</span>
        </div>
        <div className={styles.grandTotal}>
          <p>Grand total</p>
          <span>
            $
            {parseFloat(sumTotalPrice(currentProducts)) -
              promotions +
              shippingValue}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
