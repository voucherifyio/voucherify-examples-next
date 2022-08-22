import styles from "./RenderCartPreview.module.css";
import Image from "next/image";
import { EachProduct } from "../../../pages/voucher-code-redemption/types";

type Props = {
  currentProducts: EachProduct[];
  setCurrentProducts: (x: EachProduct[]) => void;
};

const RenderCartPreview = ({ currentProducts, setCurrentProducts }: Props) => {
  const products = [...currentProducts];

  const incrementQuantity = (index: number) => {
    products[index].quantity++;
    setCurrentProducts(products);
  };

  const decrementQuantity = (index: number) => {
    if (currentProducts[index].quantity <= 0) return;
    products[index].quantity--;
    setCurrentProducts(products);
  };

  return (
    <div className={styles.cartSummary}>
      <h2>Item summary</h2>
      <div className={styles.cartSummaryList}>
        {currentProducts.map((product, index) => {
          return (
            <div className={styles.productItem} key={product.id}>
              <Image
                src={product.src}
                alt="Product image"
                width={70}
                height={70}
              />
              <div className={styles.nameAndDescription}>
                <span>{product.productName}</span>
                <span>{product.productDescription}</span>
              </div>
              <div className={styles.countingProducts}>
                <button
                  className={styles.decrement}
                  onClick={() => decrementQuantity(index)}
                >
                  -
                </button>
                <input
                  className={styles.quantityInput}
                  type="number"
                  defaultValue={product.quantity}
                  disabled={true}
                />
                <button
                  className={styles.increment}
                  onClick={() => incrementQuantity(index)}
                >
                  +
                </button>
              </div>
              <span className={styles.price}>{product.price}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RenderCartPreview;
