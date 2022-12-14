import styles from "../../styles/FormPreview/FormPreview.module.css";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../types";
import { VouchersProperties, Voucher } from "../types";
import { filterZeroQuantityProducts } from "../../utils/filterZeroQuantityProducts";
import { useState } from "react";

type Props = {
  currentProducts: Product[];
  vouchersProperties: VouchersProperties;
};

const CheckoutNavButtons = ({ currentProducts, vouchersProperties }: Props) => {
  const [resultMessage, setResultMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const redeemStackable = async (
    redeemables: Voucher[],
    currentProducts: Product[]
  ) => {
    const { filteredProducts } = filterZeroQuantityProducts(currentProducts);
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        `/api/stacking-promotions/redeemStackable`,
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ redeemables, filteredProducts }),
      }
    );
    const data = await response.json();

    if (response.status !== 200) {
      setError(data.message);
      return;
    }
    setResultMessage(data.message);
    sessionStorage.clear();
  };

  return (
    <div className={styles.navButtons}>
      <button
        onClick={(e) => {
          e.preventDefault();
          redeemStackable(vouchersProperties!?.redeemables, currentProducts);
        }}
      >
        {!resultMessage ? "Complete order" || error : resultMessage}
      </button>
      <Link href="/stacking-promotions">
        <a>
          <span>
            <Image
              className={styles.returnArrow}
              src="/rightArrow.svg"
              alt="Return to cart"
              width={15}
              height={15}
            />
          </span>
          Return to cart
        </a>
      </Link>
    </div>
  );
};

export default CheckoutNavButtons;
