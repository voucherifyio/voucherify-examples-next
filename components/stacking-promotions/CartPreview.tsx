import styles from "../../styles/CartPreview/CartPreview.module.css";
import Image from "next/image";
import { Product, Voucher } from "../../pages/types";
import { useEffect } from "react";

type Props = {
  currentProducts: Product[];
  setCurrentProducts: (products: Product[]) => void;
  redeemables: Voucher[];
  isActive: boolean;
  onProductsQuantityChange: (
    currentProducts: Product[],
    voucherCodeValue: string,
    redeemables: Voucher[]
  ) => Promise<void>;
};

const RenderCartPreview = ({
  currentProducts,
  setCurrentProducts,
  redeemables,
  isActive,
  onProductsQuantityChange,
}: Props) => {
  useEffect(() => {
    onProductsQuantityChange(currentProducts, "", redeemables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProducts, onProductsQuantityChange]);

  const incrementQuantity = async (index: number) => {
    setCurrentProducts([
      ...currentProducts.slice(0, index),
      {
        ...currentProducts[index],
        quantity: currentProducts[index].quantity + 1,
      },
      ...currentProducts.slice(index + 1),
    ]);
  };

  const decrementQuantity = async (index: number) => {
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
                  onClick={async () => await decrementQuantity(index)}
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
                  onClick={async () => await incrementQuantity(index)}
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
