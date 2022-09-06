import { Products } from "../../pages/types";
import styles from "./CheckoutProductsList.module.css";
import Image from "next/image";

const CheckoutProductsList = ({ products }: Products) => {
  return (
    <div className={styles.summedProducts}>
      {products && products?.map((product) => {
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
