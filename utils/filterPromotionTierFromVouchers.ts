import { Voucher } from "../pages/types";

export const filterPromotionTierFromVouchers = (cos: Voucher[]) => {
    return cos.filter(voucher => voucher.object !== "promotion_tier");
};