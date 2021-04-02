import nc from "next-connect";
import dbMiddleware from "../../../middleware/db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
import { employee } from "../../../db";

import auth from "../../../middleware/auth";
const handler = nc({
  onError,
});
handler.use(dbMiddleware);
handler.use(auth);
handler.get(async (req: Request, res: NextApiResponse) => {
  let employees = await req.db
    .collection("employee")
    .find({ schoolId: req.userSchool })
    .toArray();

  res.json(employees);
});

handler.post(async (req: Request, res: NextApiResponse) => {
  let newEmployee = await req.db
    .collection("employee")
    .findOne({ name: req.body.name });
  if (newEmployee) return res.status(400).json({ error: "الموظف مسجل  مسبقا" });

  newEmployee = await employee.addEmployee(req.db, {
    ...req.body,
    schoolId: req.userSchool,
  });

  res.send({ data: newEmployee });
});

export default handler;
