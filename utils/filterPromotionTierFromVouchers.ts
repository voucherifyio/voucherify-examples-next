import { Voucher } from "../components/types";

export const filterPromotionTierFromVouchers = (redeemables: Voucher[]) => {
    return redeemables?.filter(voucher => voucher.object !== "promotion_tier");
};