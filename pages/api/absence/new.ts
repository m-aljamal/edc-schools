import nc from "next-connect";
import dbMissleware from "../../../middleware/db";
import { absence } from "../../../db";
import onError from "../../../middleware/error";
import { RequestStudnet } from "../../../types";
import { NextApiResponse } from "next";
import auth from "../../../middleware/auth";
const handler = nc({
  onError,
});
handler.use(dbMissleware);
handler.use(auth);
handler.put(async (req: RequestStudnet, res: NextApiResponse) => {
  const newAbsence = await absence.addAbsences(req.db, {
    ...req.body,
    schoolId: req.userSchool._id,
  });

  res.json(newAbsence);
});
export default handler;
