import styles from "../../styles/CartPreview/CartPreview.module.css";
import Image from "next/image";
import { Product, Voucher } from "../types";
import RewardsPanel from "./RewardsPanel/RewardsPanel";
import { useEffect } from "react";

type Props = {
  currentProducts: Product[];
  setCurrentProducts: (products: Product[]) => void;
  redeemables: Voucher[];
  onProductsQuantityChange: (currentProducts: Product[]) => Promise<void>;
};

const RenderCartPreview = ({
  currentProducts,
  setCurrentProducts,
  redeemables,
  onProductsQuantityChange,
}: Props) => {

  useEffect(() => {
    onProductsQuantityChange(currentProducts);
  }, [currentProducts, onProductsQuantityChange]);

  const incrementQuantity = (index: number) => {
    setCurrentProducts([
      ...currentProducts.slice(0, index),
      {
        ...currentProducts[index],
        quantity: currentProducts[index].quantity + 1,
      },
      ...currentProducts.slice(index + 1),
    ]);
  };

  const decrementQuantity = (index: number) => {
    if (currentProducts[index].quantity <= 0) return;
    setCurrentProducts([
      ...currentProducts.slice(0, index),
      {
        ...currentProducts[index],
        quantity: currentProducts[index].quantity - 1,
      },
      ...currentProducts.slice(index + 1),
    ]);
  };

  return (
    <div className={styles.cartSummary}>
      <h2>Item summary</h2>
      <RewardsPanel />
      <div className={styles.cartSummaryList}>
        {currentProducts.map((product, index) => {
          return (
            <div
              className={styles.productItem}
              key={`${product.id}-${product.quantity}`}
            >
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
