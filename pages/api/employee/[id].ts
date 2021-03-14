import nc from "next-connect";
import onError from "../../../middleware/error";
import { NextApiResponse } from "next";
import { Request } from "../../../types";
import dbMissleware from "../../../middleware/db";
const handler = nc({
  onError,
});
handler.use(dbMissleware);

handler.delete(async (req: Request, res: NextApiResponse) => {
  await req.db.collection("employee").deleteOne({ _id: req.query.id });

  res.json("delete");
});

handler.put(async (req: Request, res: NextApiResponse) => {
  const employee = await req.db
    .collection("employee")
    .updateOne({ _id: req.query.id }, { $set: req.body });
  res.json(employee);
});

export default handler;
