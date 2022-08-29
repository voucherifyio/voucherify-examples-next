import { EachProduct } from "../../../pages/voucher-code-redemption/types";
import styles from "../../../styles/Discounts.module.css";
import { sumTotalPrice } from "../../../utils/sumTotalPrice";
import { VoucherProperties } from "../RenderOrderSummary/types";

type Props = {
  products: EachProduct[];
  voucherProperties: VoucherProperties;
};

const Discounts = ({ products, voucherProperties }: Props) => {
  const shippingValue = voucherProperties?.code === "FREE-SHIPPING" ? 0 : 20;

  const sumGrandTotal = (products: EachProduct[]) => {
    const subtotal = sumTotalPrice(products);
    const promotions = voucherProperties?.discount / 100 || 0;
    const grandTotal = parseFloat(subtotal) - promotions + shippingValue;
    return grandTotal;
  };

  return (
    <div className={styles.discounts}>
      <div className={styles.discountTitle}>
        <p>Discount applied to cart</p>
      </div>
      <h5 className={styles.voucher}>
        <span>{voucherProperties?.code}</span>
      </h5>
      <div className={styles.valueProp}>
        <p>Value</p>
        <span>${voucherProperties?.discount / 100}</span>
      </div>
      <div className={styles.summedPrices}>
        <div className={styles.subtotal}>
          <p>Subtotal</p>
          <span>${sumTotalPrice(products)}</span>
        </div>
        <div className={styles.allDiscounts}>
          <p>All your discounts</p>
          <span>${voucherProperties?.discount / 100}</span>
        </div>
        <div className={styles.shipping}>
          <p>Shipping</p>
          <span>${shippingValue}</span>
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
