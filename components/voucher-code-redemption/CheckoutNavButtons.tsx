import styles from "../../styles/FormPreview/FormPreview.module.css";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../types";
import { VoucherProperties } from "./OrderSummary/types";
import { filterZeroQuantityProducts } from "../../utils/filterZeroQuantityProducts";
import { useState } from "react";

type Props = {
  currentProducts: Product[];
  voucherProperties: VoucherProperties;
};

const CheckoutNavButtons = ({ currentProducts, voucherProperties }: Props) => {
  const [resultMessage, setResultMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const redeemVoucher = async (
    voucherCode: string,
    currentProducts: Product[]
  ) => {
    const { filteredProducts } = filterZeroQuantityProducts(currentProducts);
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        `/api/voucher-code-redemption/redeemVoucher`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voucherCode, filteredProducts }),
      }
    );

    const data = await response.json();

    if (response.status !== 200) {
      setError(data.error);
      return;
    }
    setResultMessage(data.message);
  };

  return (
    <div className={styles.navButtons}>
      <button
        onClick={(e) => {
          e.preventDefault();
          redeemVoucher(voucherProperties?.code, currentProducts);
          sessionStorage.clear();
        }}
      >
        {!resultMessage ? "Complete order" || error : resultMessage}
      </button>
      <Link href="/voucher-code-redemption">
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
