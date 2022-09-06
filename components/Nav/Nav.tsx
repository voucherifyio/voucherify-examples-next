import styles from "./Nav.module.css";
import Image from "next/image";

const Nav = () => {
  return (
    <nav className={styles.navbar}>
      <Image src="/black.svg" alt="Shop logo" height={30} width={195} />
      <ul className={styles.menuWrapper}>
        <li>Bestsellers</li>
        <li>Shop all</li>
        <li>% Sales</li>
        <li>Hi Mary</li>
        <span className={styles.shoppingCart}>
          <Image
            src="/shopping_cart.svg"
            alt="Shopping cart"
            width={25}
            height={25}
          />
        </span>
      </ul>
    </nav>
  );
};

export default Nav;
