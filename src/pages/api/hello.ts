// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ name: "Method not allowed " });
  }

  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ name: "Secret missing" });
  }

  const requestSecret = req.headers["x-webhook-secret"]?.toString();
  if (!requestSecret || requestSecret !== WEBHOOK_SECRET) {
    return res.status(401).json({ name: "Secret does not match" });
  }

  return res.status(200).json({ name: "Request success" });
}
