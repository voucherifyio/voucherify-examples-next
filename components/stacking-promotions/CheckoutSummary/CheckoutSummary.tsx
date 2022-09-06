import { EachProduct } from "../../../pages/types";
import CheckoutProductsList from "../../CheckoutProductsList/CheckoutProductsList";
import styles from "../../../styles/CheckoutSummary.module.css";
import { VouchersProperties } from "../../../pages/types";
import Discounts from "../Discounts/Discounts";

type Props = {
  products: EachProduct[];
  vouchersProperties: VouchersProperties;
};

const CheckoutSummary = ({ products, vouchersProperties }: Props) => {
  return (
    <div className={styles.checkoutView}>
      <CheckoutProductsList products={products} />
      <Discounts products={products} vouchersProperties={vouchersProperties}/>
    </div>
  );
};

export default CheckoutSummary;