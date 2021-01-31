import nc from "next-connect";
import dbMissleware from "../../../middleware/db";
import { employee } from "../../../db";
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
  let newEmployee = await req.db
    .collection("employee")
    .findOne({ name: req.body.name });
  if (newEmployee) return res.status(400).json({ error: "الموظف مسجل  مسبقا" });

  newEmployee = await employee.addEmployee(req.db, {
    ...req.body,
    schoolId: req.userSchool._id,
  });

  res.send({ data: newEmployee });
});
export default handler;
