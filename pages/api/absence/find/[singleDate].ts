import nc from "next-connect";
import onError from "../../../../middleware/error";
import { NextApiResponse } from "next";
import { Request } from "../../../../types";
import dbMissleware from "../../../../middleware/db";
import setDate from "../../../../utils/setDate";
const handler = nc({
  onError,
});
handler.use(dbMissleware);
handler.get(async (req: Request, res: NextApiResponse) => {
  const abcence = await req.db.collection("absences").findOne({
    date: { $eq: setDate(req.query.singleDate.toString()) },
  });

  res.status(200).json(abcence);
});

// .findOne({ $and: [{ schoolId }, { date: { $eq: date } }] });
export default handler;

// export const getAbsenceBySchoolAndDate = async (
//   db: Db,
//   schoolId: string,
//   date: string
// ) => {
//   const findAbsences = await db
//     .collection("absences")
//     .findOne({ $and: [{ schoolId }, { date: { $eq: date } }] });

//   return findAbsences;
// };

// const firstDay = new Date(y, m, 1);
// const lastDay = new Date(y, m + 1, 0);
// const currentMonthTimeSheet = await req.db
//   .collection("absences")
//   .find({
//     $and: [
//       { date: { $gte: firstDay.toISOString() } },
//       { date: { $lte: lastDay.toISOString() } },
//     ],
