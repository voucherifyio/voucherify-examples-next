import styles from "../../../styles/FormPreview/FormPreview.module.css";
import Image from "next/image";
import CheckoutNavButtons from "../CheckoutNavButtons/CheckoutNavButtons";
import { EachProduct } from "../../../pages/types";
import { VoucherProperties } from "../RenderOrderSummary/types";

type Props = {
  products: EachProduct[];
  voucherProperties: VoucherProperties;
};

const FormPreview = ({ products, voucherProperties }: Props) => {
  return (
    <div className={styles.personalInformation}>
      <nav className={styles.navWrapper}>
        <div className={styles.logoWrapper}>
          <Image src="/black.svg" alt="Shop logo" width={195} height={30} />
        </div>
        <div className={styles.navSteps}>
          <p className={styles.underline}>Cart</p>
          <span className={styles.stepArrow}>
            <Image
              src="/smallrightarrow.svg"
              alt=""
              width="100%"
              height="100%"
            />
          </span>
          <p className={styles.underline}>Personal information</p>
          <span className={styles.stepArrow}>
            <Image
              src="/smallrightarrow.svg"
              alt=""
              width="100%"
              height="100%"
            />
          </span>
          <p className={styles.underline}>Shipping</p>
          <span className={styles.stepArrow}>
            <Image src="/smallrightarrow.svg" alt="" width="80%" height="80%" />
          </span>
          <p className={styles.underline}>Payment</p>
        </div>
      </nav>
      <form className={styles.shippingForm}>
        <div className={styles.contactInfo}>
          <div className={styles.contactInfoTitle}>
            <h5>Contact information</h5>
            <p>
              Already have an account? <span>Log in</span>
            </p>
          </div>
          <label htmlFor="email-phone">
            <input
              type="text"
              id="email-phone"
              defaultValue="jacksmith@test.com"
            />
          </label>
          <div className={styles.contactCheckbox}>
            <label htmlFor="news">
              <input type="checkbox" id="news" />
            </label>
            <p>Keep me up to date on news and offers</p>
          </div>
        </div>
        <div className={styles.adressInfo}>
          <h5>Shipping adress</h5>
          <label htmlFor="fullname">
            <input type="name" id="fullname" defaultValue="Jack Smith" />
          </label>
          <label htmlFor="company">
            <input type="text" id="company" defaultValue="Voucherify" />
          </label>
          <label htmlFor="adress">
            <input type="text" id="adress" defaultValue="Magic Street 10" />
          </label>
          <div className={styles.cityProperties}>
            <label htmlFor="postal">
              <input type="text" id="postal" defaultValue="11-130" />
            </label>
            <label htmlFor="city">
              <input type="text" id="city" defaultValue="Katowice" />
            </label>
          </div>
          <label htmlFor="counries" className={styles.countries}>
            <select id="countries">
              <option defaultValue="Poland">Poland</option>
              <option defaultValue="France">France</option>
              <option defaultValue="Spain">Spain</option>
            </select>
          </label>
          <div className={styles.contactCheckbox}>
            <label htmlFor="news">
              <input type="checkbox" id="news" />
            </label>
            <p>Save this information for next time</p>
          </div>
        </div>
        <CheckoutNavButtons
          products={products}
          voucherProperties={voucherProperties as VoucherProperties}
        />
      </form>
    </div>
  );
};

export default FormPreview;
