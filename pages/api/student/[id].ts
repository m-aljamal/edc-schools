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
  await req.db.collection("students").deleteOne({ _id: req.query.id });

  res.json("delete");
});

handler.put(async (req: Request, res: NextApiResponse) => {
  await req.db
    .collection("studentsAbcence")
    .updateMany(
      { names: { $elemMatch: { _id: req.query.id } } },
      { $set: { "names.$": { _id: req.query.id, ...req.body } } }
    );

  const student = await req.db
    .collection("students")
    .updateOne({ _id: req.query.id }, { $set: req.body });
  res.json(student);
});

export default handler;
