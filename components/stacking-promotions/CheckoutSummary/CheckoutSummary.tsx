import { EachProduct } from "../../../pages/types";
import CheckoutProductsList from "../../CheckoutProductsList/CheckoutProductsList";
import styles from "../../../styles/CheckoutSummary.module.css";
import { VouchersProperties } from "../../../pages/types";

type Props = {
  products: EachProduct[];
  vouchersProperties: VouchersProperties;
};

const CheckoutSummary = ({ products, vouchersProperties }: Props) => {
  return (
    <div className={styles.checkoutView}>
      <CheckoutProductsList products={products} />
    </div>
  );
};

export default CheckoutSummary;