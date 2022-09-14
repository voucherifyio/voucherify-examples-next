import styles from "./RewardsPanel.module.css";
import Image from "next/image";
import { Product, PromotionTier } from "../../types";
import { sumTotalPrice } from "../../../utils/sumTotalPrice";

type Props = {
  vouchersProperties: PromotionTier[];
  currentProducts: Product[];
};

const RewardsPanel = ({ vouchersProperties, currentProducts }: Props) => {
  const rewardProperties = [
    { tier: "FREE SHIPPING", price: 100 },
    { tier: "3%", price: 250 },
    { tier: "6%", price: 500 },
  ];

  const progressTiers = [
    { progressTier: "0", dist: "0" },
    { progressTier: "100", dist: "79" },
    { progressTier: "250", dist: "192" },
    { progressTier: "500", dist: "365" },
  ];

  return (
    <div className={styles.rewardWrapper}>
      <div className={styles.rewardTitles}>
        <h4>REWARDS</h4>
        {rewardProperties.map((reward, index) => {
          return (
            <p key={index}>
              <span>
                {parseFloat(sumTotalPrice(currentProducts)) >=
                rewardProperties[index].price ? (
                  <Image
                    src="/reward-achieved.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    src="/blocked-icon.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                )}
              </span>
              {reward.tier}
            </p>
          );
        })}
      </div>
      <div className={styles.progressBarWrapper}>
        <div id="progress-bar-numbers" className={styles.progressBarNumbers}>
          {progressTiers.map((tier, index) => {
            return <span key={index}>{tier.progressTier}</span>;
          })}
        </div>
        <div className={styles.progressBarContent}>
          <span
            className={styles.progressTier}
            style={{
              width: `${
                progressTiers[vouchersProperties[0]?.hierarchy]?.dist || 0
              }px`,
              transition: "0.4s",
            }}
          ></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <h4 className={styles.rewardBanner}>
        {vouchersProperties[0]?.hierarchy !== 3
          ? vouchersProperties[0]?.banner ||
            "Spend $100 more to get FREE SHIPPING"
          : "Congratulations, you achieved all rewards!"}
      </h4>
    </div>
  );
};

export default RewardsPanel;
