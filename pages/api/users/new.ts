import nc from "next-connect";
import dbMissleware from "../../../middleware/db";
import { user } from "../../../db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
import admin from "../../../middleware/admin";
import { nanoid } from "nanoid";
const handler = nc({
  onError,
});

handler.use(dbMissleware);
handler.post(async (req: Request, res: NextApiResponse) => {
  const { name, email, password, isAdmin } = req.body;
  let newUser = await req.db.collection("users").findOne({ email });
  if (newUser) return res.status(400).json({ error: "المستخدم مسجل مسبقا" });
  if (!isAdmin && !req.body.schoolName) {
    return res.status(400).json({ error: "الرجاء ادخال اسم المدرسة" });
  }
  newUser = await req.db
    .collection("users")
    .insertOne({
      _id: nanoid(),
      name,
      email,
      password,
      isAdmin,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0]);
  if (!isAdmin) {
    await req.db.collection("schools").insertOne({
      _id: nanoid(),
      name: req.body.schoolName,
      director: newUser._id,
    });
  }
  res.send({ newUser });
});
export default handler;
