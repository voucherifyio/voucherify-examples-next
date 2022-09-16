import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { MetaProperties } from "../components/MetaProperties/Meta";
import styles from "../styles/WelcomeScreen.module.css";

const WelcomeScreen: NextPage = () => {

  const checkCredentials = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/checkCredentials`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if (response.status === 401) {
      throw new Error(data.error)
    }
    throw new Error(data.error)
  };

  useEffect(() => {
    checkCredentials();
  }, []);

  return (
    <>
      <MetaProperties />
      <main className={styles.main}>
        <h1 className={styles.title}>Voucherify Examples</h1>
        <div className={styles.projectsWrapper}>
          <Link className={styles.linkTo} href="/voucher-code-redemption/">
            <div className={styles.project}>
              <div className={styles.vLogo}>
                <Image
                  src="/Group.svg"
                  alt="Logo Voucherify"
                  width={175}
                  height={175}
                />
              </div>
              <p>Voucher code redemption</p>
              <div className={styles.projectDescription}>
                This sample shows you how to integrate with Voucherify voucher
                redemption endpoint. Validating and accepting promo codes in
                your checkout from scratch might be tricky — calculating
                discounted prices, error message handling, and localization are
                just a few things to think about when building a simple promo
                code redemption flow.
              </div>
            </div>
          </Link>
          <Link className={styles.linkTo} href="/stacking-promotions/">
            <div className={styles.project}>
              <div className={styles.vLogo}>
                <Image
                  src="/Group.svg"
                  alt="Logo Voucherify"
                  width={175}
                  height={175}
                />
              </div>
              <p>Stacking promotions</p>
              <div className={styles.projectDescription}>
                This sample shows you how to stack different types of promotions
                with Voucherify. This is achieved by integrating validate
                stackable and redeem stackable endpoints. The stacking mechanism
                allows you to combine up to 5 promo codes or cart-level
                promotions with a single request.
              </div>
            </div>
          </Link>
          <Link className={styles.linkTo} href="/tiered-cart-promotions/">
            <div className={styles.project}>
              <div className={styles.vLogo}>
                <Image
                  src="/Group.svg"
                  alt="Logo Voucherify"
                  width={175}
                  height={175}
                />
              </div>
              <p>Tiered cart promotions</p>
              <div className={styles.projectDescription}>
                This sample shows how we can reward our customers by adding
                rewards for more money spent. We can achieve that solution
                thanks validate promotion endpoint. At the end we should use
                redeem endpoint like in the older examples.
              </div>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
};

export default WelcomeScreen;