import { Voucher } from "../components/types";

export const removeDuplicatedPromoObjects = (array: Voucher[]) => {
    return array?.filter((value, index, self) => index === self.findIndex(t => (t.id === value.id)));
};