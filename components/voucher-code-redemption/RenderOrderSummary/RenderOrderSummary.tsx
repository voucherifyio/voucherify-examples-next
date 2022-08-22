import styles from "./RenderOrderSummary.module.css";
import Image from "next/image";
import { sumTotalPrice } from "../../../utils/sumTotalPrice";
import { EachProduct } from "../../../pages/voucher-code-redemption/types";
import { ChangeEvent, useState } from "react";

type Props = {
  currentProducts: EachProduct[];
};

const RenderOrderSummary = ({ currentProducts }: Props) => {
  const [voucherCode, setVoucherCode] = useState<string>();

  const getValue = (e: ChangeEvent) => {
    setVoucherCode((e.target as HTMLInputElement).value);
  };

  const filterZeroQuantityProducts = (currentProducts: EachProduct[]) => {
    const filteredProducts = currentProducts
      .filter((product) => product.quantity !== 0)
      .map((product) => {
        return { id: product.id, quantity: product.quantity };
      });
    return { filteredProducts };
  };

  const validateVoucher = async (
    voucherCode: string,
    currentProducts: EachProduct[]
  ) => {
    const { filteredProducts } = filterZeroQuantityProducts(currentProducts);
    console.log(filteredProducts);
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        `/api/voucher-code-redemption/validateVoucher`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voucherCode, filteredProducts }),
      }
    );
    const data = response.json();
    console.log(data);
    return data;
  };

  return (
    <div className={styles.orderSummary}>
      <h2>Order summary</h2>
      <div className={styles.totalOrderWrapper}>
        <h4>
          Subtotal:<span>${sumTotalPrice(currentProducts)}</span>
        </h4>
        <h4>
          Shipping:<span>Calculated at next step</span>
        </h4>
        <h4>Coupon codes:</h4>
        <div className={styles.voucherExamples}>
          <span>BLCKFRDY ($10.00)</span>
          <span>FREE-SHIPPING (Free shipping)</span>
        </div>
        <div className={styles.voucherCodeFormWrapper}>
          <form
            className={styles.voucherCodeForm}
            onSubmit={(e) => {
              e.preventDefault();
              validateVoucher(voucherCode as string, currentProducts);
            }}
          >
            <input
              type="text"
              placeholder="Enter your code"
              id={styles.voucherCode}
              onChange={(e) => getValue(e)}
            />
            <button id={styles.checkVoucherCode}>
              <Image
                src="/rightArrow.svg"
                alt="Submit arrow"
                width="100%"
                height="60%"
              />
            </button>
          </form>
        </div>
        <div className={styles.voucherFormErrorWrapper}>
          <p></p>
        </div>
        <div className={styles.promotionsWrapper}>
          <h4>Promotions:</h4>
          <div className={styles.promotionHolder}></div>
          <div className={styles.promotionError}></div>
        </div>
        <h4 className={styles.discountPriceHolder}>
          All Your Discounts:<span id={styles.allDiscounts}>n/a</span>
        </h4>
        <h4>
          Grand total:
          <span id={styles.grandTotal}>${sumTotalPrice(currentProducts)}</span>
        </h4>
      </div>
      <button id={styles.checkoutButton}>Checkout</button>
    </div>
  );
};

export default RenderOrderSummary;
