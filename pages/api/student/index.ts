import nc from "next-connect";
import dbMiddleware from "../../../middleware/db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
import auth from "../../../middleware/auth";
const handler = nc({
  onError,
});
handler.use(dbMiddleware);
handler.use(auth);

handler.get(async (req: Request, res: NextApiResponse) => {
  let students = await req.db
    .collection("students")
    .find({ schoolId: req.userSchool })
    .toArray();

  res.json(students);
});

export default handler;
