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
handler.put(async (req: Request, res: NextApiResponse) => {
  const absenceUsers = await req.db
    .collection("employee")
    .find({ _id: { $in: req.body.absenceIds } })
    .project({ name: 1 })
    .toArray();

  const newAbsence = await req.db.collection("absences").updateOne(
    { _id: req.query.id },
    {
      $set: {
        employees: absenceUsers,
        date: setDate(req.body.date),
        reason: req.body.reason,
      },
    }
  );

  res.status(200).json(newAbsence);
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
