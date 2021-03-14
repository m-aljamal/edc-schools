import nc from "next-connect";
import dbMissleware from "../../../middleware/db";
import { absence } from "../../../db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
import auth from "../../../middleware/auth";
const handler = nc({
  onError,
});
handler.use(dbMissleware);
handler.use(auth);
handler.post(async (req: Request, res: NextApiResponse) => {
  console.log(req.body.absenceIds.length);

  if (req.body.absenceIds.length === 0) {
    return res.status(400).json({ error: "لايوجد اسماء غياب" });
  }
  const newAbsence = await absence.addAbsences(req.db, {
    ...req.body,
    schoolId: req.userSchool._id,
  });

  res.json(newAbsence);
});
export default handler;
