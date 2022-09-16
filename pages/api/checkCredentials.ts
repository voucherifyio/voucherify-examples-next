import { NextApiRequest, NextApiResponse } from "next";
import { client } from "./voucherifyClient";

type Error = {
  code: number;
  key: string;
  page: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await client.vouchers.list();
    } catch (error) {
      if ((error as Error).code === 401) {
        const msg =
          "Your API credentials are incorrect, please check your applicationId and secretKey or visit https://docs.voucherify.io/docs/authentication to complete your app configuration.";
        return res.status(401).json({ error: msg });
      }
      return res.status(400).json({ error: (error as Error).key });
    }
  }
}
