import { client } from "../voucherifyClient";
import { NextApiRequest, NextApiResponse } from "next";

const customer = {
    "source_id": "test_customer_id_1"
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    return new Promise(async () => {
        const { valid } = await client.validations.validateVoucher("BLCKFRDY", { order: { amount: 50000 }, customer: customer });
        console.log(valid)

        switch(method) {
            case "GET":
                if (!valid) {
                    return res.status(404).json({ error: "Voucher not found" });
                }
                return res.status(200).json(valid);
            default:
                return res.status(400).json({ error: "No response for this request" });
                };
            })
};