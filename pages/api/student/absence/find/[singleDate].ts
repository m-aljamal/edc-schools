import nc from "next-connect";
import onError from "../../../../../middleware/error";
import { NextApiResponse } from "next";
import { Request } from "../../../../../types";
import dbMissleware from "../../../../../middleware/db";
import setDate from "../../../../../utils/setDate";
const handler = nc({
  onError,
});
handler.use(dbMissleware);
handler.get(async (req: Request, res: NextApiResponse) => {
  const abcence = await req.db.collection("studentsAbcence").findOne({
    date: { $eq: setDate(req.query.singleDate.toString()) },
  });

  res.status(200).json(abcence);
});

export default handler;
