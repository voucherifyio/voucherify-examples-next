import { EachProduct } from "../../../pages/types";
import CheckoutProductsList from "../../CheckoutProductsList/CheckoutProductsList";
import styles from "../../../styles/CheckoutSummary.module.css";
import Discounts from "../Discounts/Discounts";
import { VoucherProperties } from "../RenderOrderSummary/types";

type Props = {
  products: EachProduct[];
  voucherProperties: VoucherProperties;
};

const CheckoutSummary = ({ products, voucherProperties }: Props) => {
  return (
    <div className={styles.checkoutView}>
      <CheckoutProductsList products={products} />
      <Discounts products={products} voucherProperties={voucherProperties} />
    </div>
  );
};

export default CheckoutSummary;
