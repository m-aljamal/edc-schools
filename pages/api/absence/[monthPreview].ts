import nc from "next-connect";
import onError from "../../../middleware/error";
import { NextApiResponse } from "next";
import { Request } from "../../../types";
import dbMissleware from "../../../middleware/db";

const handler = nc({
  onError,
});
handler.use(dbMissleware);
handler.get(async (req: Request, res: NextApiResponse) => {
  const date = new Date(req.query.monthPreview.toString()),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);
  const currentMonthTimeSheet = await req.db
    .collection("absences")
    .find({
      $and: [
        { date: { $gte: firstDay.toISOString() } },
        { date: { $lte: lastDay.toISOString() } },
      ],
    })
    .toArray();

  res.json(currentMonthTimeSheet);
});

export default handler;
