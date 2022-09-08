import styles from "../../styles/RenderCartPreview/RenderCartPreview.module.css";
import Image from "next/image";
import { Product } from "../../pages/types";
import { VoucherProperties } from "./RenderOrderSummary/types";

type Props = {
  currentProducts: Product[];
  setCurrentProducts: (products: Product[]) => void;
  setVoucherCodeValue: (voucherCodeValue: string) => void;
  voucherProperties: VoucherProperties;
  validateVoucher: (
    voucherCodeValue: string,
    currentProducts: Product[]
  ) => unknown;
};

const RenderCartPreview = ({
  currentProducts,
  setCurrentProducts,
  voucherProperties,
  validateVoucher,
}: Props) => {
  const products = [...currentProducts];

  const incrementQuantity = (index: number) => {
    products[index].quantity++;
    setCurrentProducts(products);
    voucherProperties?.code &&
      validateVoucher(voucherProperties.code, currentProducts);
  };

  const decrementQuantity = (index: number) => {
    if (currentProducts[index].quantity <= 0) return;
    products[index].quantity--;
    setCurrentProducts(products);
    voucherProperties?.code &&
      validateVoucher(voucherProperties.code, currentProducts);
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
