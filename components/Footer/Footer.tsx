import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerLeftSide}>
        <div style={{ padding: "50px 0 20px 0" }}>
          <Image src="/black.svg" alt="Shop logo" width={180} height={30} />
        </div>
        <label htmlFor="email">Sign up for offers and more</label>
        <div className={styles.emailWrapper}>
          <input type="email" id="email" placeholder="Enter your email here" />
          <button className={styles.emailButton}>
            <Image
              src="/rightArrow.svg"
              alt="Submit arrow"
              width="100%"
              height="60%"
            />
          </button>
        </div>
        <div className={styles.socialMediaIcons}>
          <Image
            src="/Twitter.svg"
            alt="Twitter icon"
            width={25}
            height="100%"
          />
          <Image
            src="/Facebook.svg"
            alt="Facebook icon"
            width={25}
            height="100%"
          />
          <Image
            src="/LinkedIn.svg"
            alt="Linkedin icon"
            width={25}
            height="100%"
          />
        </div>
      </div>
      <div className={styles.footerRightSide}>
        <ul>
          <li>Discover</li>
          <li>Bestsellers</li>
          <li>Shop all</li>
          <li className={styles.sales}>% Sales</li>
        </ul>
        <ul>
          <li>About</li>
          <li>Help</li>
          <li>Shipping/Return</li>
          <li>Affiliates</li>
        </ul>
        <ul>
          <li>Legal</li>
          <li>Contact</li>
          <li>Privacy Policies</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
      <div className={styles.productInfo}>
        <p>&copy; 2022 Voucherify</p>
        <Link
          target="_blank"
          href="https://github.com/voucherifyio/voucherify-examples-next"
        >
          <a>GitHub - Voucherify Examples</a>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
