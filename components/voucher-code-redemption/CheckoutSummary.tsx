import { Product } from "../types";
import CheckoutProductsList from "../CheckoutProductsList/CheckoutProductsList";
import styles from "../../styles/CheckoutSummary.module.css";
import Discounts from "./Discounts";
import { VoucherProperties } from "./OrderSummary/types";

type Props = {
  currentProducts: Product[];
  voucherProperties: VoucherProperties;
};

const CheckoutSummary = ({ currentProducts, voucherProperties }: Props) => {
  return (
    <div className={styles.checkoutView}>
      <CheckoutProductsList currentProducts={currentProducts} />
      <Discounts
        currentProducts={currentProducts}
        voucherProperties={voucherProperties}
      />
    </div>
  );
};

export default CheckoutSummary;
