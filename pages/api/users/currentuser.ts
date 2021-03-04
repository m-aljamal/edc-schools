import nc from "next-connect";
import onError from "../../../middleware/error";
import { NextApiResponse, NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import { connect } from "../../../utils/database";
const handler = nc({
  onError,
});
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connect();
  const decoded = jwt.verify(req.cookies.auth_token, process.env.JWT_SECRET);

  let currentUser = await db.collection("users").findOne({ _id: decoded.id });
  res.json(currentUser);
});

export default handler;
