import nc from "next-connect";
import dbMissleware from "../../../middleware/db";
import { absence } from "../../../db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
import auth from "../../../middleware/auth";
import setDate from "../../../utils/setDate";
const handler = nc({
  onError,
});
handler.use(dbMissleware);
handler.use(auth);
handler.post(async (req: Request, res: NextApiResponse) => {
  if (req.body.absenceIds.length === 0) {
    return res.status(400).json({ error: "لايوجد اسماء غياب" });
  }
  const date = setDate(req.body.date);

  let newAbsence = await req.db
    .collection("absences")
    .findOne({ $and: [{ schoolId: req.userSchool }, { date: date }] });
  if (newAbsence)
    return res
      .status(400)
      .json({ error: "تم تسجيل الغياب بهذا التاريخ مسبقا" });
  newAbsence = await absence.addAbsences(req.db, {
    ...req.body,
    schoolId: req.userSchool,
  });

  res.json(newAbsence);
});
export default handler;
