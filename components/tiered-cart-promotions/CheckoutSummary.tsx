import { Product, PromotionTier } from "../types";
import styles from "../../styles/CheckoutSummary.module.css";
import CheckoutProductsList from "../CheckoutProductsList/CheckoutProductsList";
import Discounts from "./Discounts";

type Props = {
  currentProducts: Product[];
  vouchersProperties: PromotionTier[];
};

const CheckoutSummary = ({ currentProducts, vouchersProperties }: Props) => {
  return (
    <div className={styles.checkoutView}>
      <CheckoutProductsList currentProducts={currentProducts} />
      <Discounts
        currentProducts={currentProducts}
        vouchersProperties={vouchersProperties}
      />
    </div>
  );
};

export default CheckoutSummary;
