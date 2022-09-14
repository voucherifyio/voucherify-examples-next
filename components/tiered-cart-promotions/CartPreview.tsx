import styles from "../../styles/CartPreview/CartPreview.module.css";
import Image from "next/image";
import { Product, PromotionTier, Voucher } from "../types";
import RewardsPanel from "./RewardsPanel/RewardsPanel";
import { useEffect } from "react";

type Props = {
  currentProducts: Product[];
  setCurrentProducts: (products: Product[]) => void;
  onProductsQuantityChange: (currentProducts: Product[]) => Promise<void>;
  isActive: boolean;
  vouchersProperties: PromotionTier[];
};

const RenderCartPreview = ({
  currentProducts,
  setCurrentProducts,
  onProductsQuantityChange,
  isActive,
  vouchersProperties,
}: Props) => {
  const incrementQuantity = async (index: number) => {
    const newCurrentProducts = [
      ...currentProducts.slice(0, index),
      {
        ...currentProducts[index],
        quantity: currentProducts[index].quantity + 1,
      },
      ...currentProducts.slice(index + 1),
    ];
    setCurrentProducts(newCurrentProducts);
    await onProductsQuantityChange(newCurrentProducts);
  };

  const decrementQuantity = async (index: number) => {
    if (currentProducts[index].quantity <= 0) return;
    const newCurrentProducts = [
      ...currentProducts.slice(0, index),
      {
        ...currentProducts[index],
        quantity: currentProducts[index].quantity - 1,
      },
      ...currentProducts.slice(index + 1),
    ];
    setCurrentProducts(newCurrentProducts);
    await onProductsQuantityChange(newCurrentProducts);
  };

  return (
    <div className={styles.cartSummary}>
      <h2>Item summary</h2>
      <RewardsPanel
        vouchersProperties={vouchersProperties}
        currentProducts={currentProducts}
      />
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
                  disabled={isActive}
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
                  disabled={isActive}
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
