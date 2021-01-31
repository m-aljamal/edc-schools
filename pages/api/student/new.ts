import nc from "next-connect";
import dbMissleware from "../../../middleware/db";
import { student } from "../../../db";
import onError from "../../../middleware/error";
import { RequestStudnet } from "../../../types";
import { NextApiResponse } from "next";
import auth from "../../../middleware/auth";
const handler = nc({
  onError,
});
handler.use(dbMissleware);
handler.use(auth);
handler.post(async (req: RequestStudnet, res: NextApiResponse) => {
  let newStudent = await req.db
    .collection("students")
    .findOne({ name: req.body.name });
  if (newStudent) return res.status(400).json({ error: "الطالب مسجل  مسبقا" });
  console.log('req.userSchool',req.userSchool);
  
  newStudent = await student.addStudent(req.db, {
    ...req.body,
    schoolId: req.userSchool._id,
  });

  res.send({ data: newStudent });
});
export default handler;
