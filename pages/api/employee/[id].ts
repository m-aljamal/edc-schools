import nc from "next-connect";
import onError from "../../../middleware/error";
import { NextApiResponse, NextApiRequest } from "next";
import { connect } from "../../../utils/database";

const handler = nc({
  onError,
});
handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connect();
  await db.collection("employee").deleteOne({ _id: req.query.id });

  res.json("delete");
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connect();
  const employee = await db
    .collection("employee")
    .updateOne({ _id: req.query.id }, { $set: req.body });
  res.json(employee);
});

export default handler;
