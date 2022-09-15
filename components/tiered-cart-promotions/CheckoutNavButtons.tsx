import { Product, PromotionTier } from "../types";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/FormPreview/FormPreview.module.css";
import { filterZeroQuantityProducts } from "../../utils/filterZeroQuantityProducts";

type Props = {
  currentProducts: Product[];
  vouchersProperties: PromotionTier[];
};

const CheckoutNavButtons = ({ currentProducts, vouchersProperties }: Props) => {
  const [resultMessage, setResultMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const redeemStackable = async (
    currentProducts: Product[],
    vouchersProperties: PromotionTier[]
  ) => {
    const { filteredProducts } = filterZeroQuantityProducts(currentProducts);
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        `/api/tiered-cart-promotions/redeemStackable`, {
            method: "POST",
            headers: {
                "Accept": "applicaiton/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ filteredProducts, vouchersProperties })
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
          redeemStackable(currentProducts, vouchersProperties);
        }}
      >
        {!resultMessage ? "Complete order" || error : resultMessage}
      </button>
      <Link href="/tiered-cart-promotions">
        <a>
          <span>
            <Image
              className={styles.returnArrow}
              src="/rightArrow.svg"
              alt="Return to cart"
              width={15}
              height={15}
            />
          </span>{" "}
          Return to cart
        </a>
      </Link>
    </div>
  );
};

export default CheckoutNavButtons;
