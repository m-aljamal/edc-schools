import nc from "next-connect";
import onError from "../../../middleware/error";
import { NextApiResponse } from "next";
import { RequestStudnet } from "../../../types";
import { connect } from "../../../utils/database";

const handler = nc({
  onError,
});
handler.post(async (req: RequestStudnet, res: NextApiResponse) => {
  const { db } = await connect();
  const newAbsence = await db
    .collection("absences")
    .insertOne({ ...req.body, schoolId: req.userSchool._id });

  res.json(newAbsence);
});
export default handler;
