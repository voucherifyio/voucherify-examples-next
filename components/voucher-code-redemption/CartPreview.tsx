import styles from "../../styles/CartPreview/CartPreview.module.css";
import Image from "next/image";
import { Product } from "../types";
import { VoucherProperties } from "./OrderSummary/types";

type Props = {
  currentProducts: Product[];
  setCurrentProducts: (products: Product[]) => void;
  setVoucherCodeValue: (voucherCodeValue: string) => void;
  voucherProperties: VoucherProperties;
  onProductsQuantityChange: (
    voucherCodeValue: string,
    currentProducts: Product[]
  ) => unknown;
};

const RenderCartPreview = ({
  currentProducts,
  setCurrentProducts,
  voucherProperties,
  onProductsQuantityChange,
}: Props) => {

  const incrementQuantity = (index: number) => {
    const newCurrentProducts = [
      ...currentProducts.slice(0, index),
      {
        ...currentProducts[index],
        quantity: currentProducts[index].quantity + 1,
      },
      ...currentProducts.slice(index + 1),
    ];
    setCurrentProducts(newCurrentProducts);
    voucherProperties?.code &&
      onProductsQuantityChange(voucherProperties.code, currentProducts);
  };

  const decrementQuantity = (index: number) => {
    if (currentProducts[index].quantity <= 0) return;
    const newCurrentProducts = [
      ...currentProducts.slice(0, index),
      {
        ...currentProducts[index],
        quantity: currentProducts[index].quantity - 1,
      },
      ...currentProducts.slice(index + 1),
    ];
    setCurrentProducts(newCurrentProducts)
    voucherProperties?.code &&
      onProductsQuantityChange(voucherProperties.code, currentProducts);
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
