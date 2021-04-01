import nc from "next-connect";
import onError from "../../../middleware/error";
import { NextApiResponse } from "next";
import { Request } from "../../../types";
import { connect } from "../../../utils/database";
import dbMissleware from "../../../middleware/db";

const handler = nc({
  onError,
});
handler.use(dbMissleware);
handler.post(async (req: Request, res: NextApiResponse) => {
  const newAbsence = await req.db
    .collection("absences")
    .insertOne({ ...req.body, schoolId: req.userSchool });

  res.json(newAbsence);
});
export default handler;
