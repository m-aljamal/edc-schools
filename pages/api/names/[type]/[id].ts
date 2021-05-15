import nc from "next-connect";
import onError from "../../../../middleware/error";
import { NextApiResponse } from "next";
import { Request } from "../../../../types";
import dbMissleware from "../../../../middleware/db";
import { databaseCollections } from "../../../../static/databaseCollections";

const handler = nc({
  onError,
});
handler.use(dbMissleware);

handler.delete(async (req: Request, res: NextApiResponse) => {
  const collection = databaseCollections[req.query.type.toString()].names;

  await req.db.collection(collection).deleteOne({ _id: req.query.id });

  res.json("delete");
});

handler.put(async (req: Request, res: NextApiResponse) => {
  const absenceCollection =
    databaseCollections[req.query.type.toString()].abcence;
  const namesCollection = databaseCollections[req.query.type.toString()].names;

  await req.db
    .collection(absenceCollection)
    .updateMany(
      { names: { $elemMatch: { _id: req.query.id } } },
      { $set: { "names.$": { _id: req.query.id, ...req.body } } }
    );

  const employee = await req.db
    .collection(namesCollection)
    .updateOne({ _id: req.query.id }, { $set: req.body });
  res.json(employee);
});

export default handler;
