import nc from "next-connect";
import dbMissleware from "../../../middleware/db";
import { user } from "../../../db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
import admin from "../../../middleware/admin";
const handler = nc({
  onError,
});

handler.use(dbMissleware);
handler.use(admin);
handler.post(async (req: Request, res: NextApiResponse) => {
  const { name, email, password, isAdmin } = req.body;
  let newUser = await req.db.collection("users").findOne({ email });
  if (newUser) return res.status(400).json({ error: "المستخدم مسجل مسبقا" });
  newUser = await user.createUser(req.db, {
    name,
    email,
    password,
    isAdmin,
  });

  res.send({ data: newUser });
});
export default handler;
