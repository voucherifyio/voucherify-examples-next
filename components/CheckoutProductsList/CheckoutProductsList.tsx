import { Product, Products } from "../../pages/types";
import styles from "./CheckoutProductsList.module.css";
import Image from "next/image";

type Props = {
  currentProducts: Product[];
};

const CheckoutProductsList = ({ currentProducts }: Props) => {
  return (
    <div className={styles.summedProducts}>
      {currentProducts?.map((product) => {
        return (
          <div key={product.id} className={styles.eachProduct}>
            <Image src={product.src} alt="" width={80} height={80} />
            <div className={styles.eachProductName}>
              <h6>{product.productName}</h6>
              <p>Quantity {product.quantity}</p>
            </div>
            <span>{product.price}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutProductsList;
