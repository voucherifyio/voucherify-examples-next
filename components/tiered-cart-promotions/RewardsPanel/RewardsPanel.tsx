import styles from "./RewardsPanel.module.css";
import Image from "next/image";

const RewardsPanel = () => {
  return (
    <div className={styles.rewardWrapper}>
      <div className={styles.rewardTitles}>
        <h4>REWARDS</h4>
        <p>
          <span>
            <Image src="/blocked-icon.svg" alt="" width={20} height={20} />
          </span>
          FREE SHIPPING
        </p>
        <p>
          <span>
            <Image src="/blocked-icon.svg" alt="" width={20} height={20} />
          </span>
          3%
        </p>
        <p>
          <span>
            <Image src="/blocked-icon.svg" alt="" width={20} height={20} />
          </span>
          6%
        </p>
      </div>
      <div className={styles.progressBarWrapper}>
        <div className={styles.progressBarNumbers}>
          <span>0</span>
          <span>100</span>
          <span>250</span>
          <span>500</span>
        </div>
        <div className={styles.progressBarContent}>
          <span className={styles.progressTier}></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <h4 className={styles.rewardBanner}>
        Spend $100 more to get FREE SHIPPING
      </h4>
    </div>
  );
};

export default RewardsPanel;
