import { VoucherifyServerSide } from "@voucherify/sdk";

export const client = VoucherifyServerSide({
  applicationId: process.env.VOUCHERIFY_APP_ID,
  secretKey: process.env.VOUCHERIFY_SECRET_KEY
});