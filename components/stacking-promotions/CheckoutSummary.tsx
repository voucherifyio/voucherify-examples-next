import { Product } from "../../pages/types";
import CheckoutProductsList from "../CheckoutProductsList/CheckoutProductsList";
import styles from "../../styles/CheckoutSummary.module.css";
import { VouchersProperties } from "../../pages/types";
import Discounts from "./Discounts";

type Props = {
  currentProducts: Product[];
  vouchersProperties: VouchersProperties;
};

const CheckoutSummary = ({ currentProducts, vouchersProperties }: Props) => {
  return (
    <div className={styles.checkoutView}>
      <CheckoutProductsList currentProducts={currentProducts} />
      <Discounts
        products={currentProducts}
        vouchersProperties={vouchersProperties}
      />
    </div>
  );
};

export default CheckoutSummary;
