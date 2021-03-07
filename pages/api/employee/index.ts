import nc from "next-connect";
import dbMiddleware from "../../../middleware/db";
import onError from "../../../middleware/error";
import { RequestStudnet } from "../../../types";
import { NextApiResponse, NextApiRequest } from "next";
import { connect } from "../../../utils/database";
import { employee } from "../../../db";

import auth from "../../../middleware/auth";
const handler = nc({
  onError,
});
handler.use(dbMiddleware);
// handler.use(auth);
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connect();
  let employees = await db.collection("employee").find().toArray();

  res.json(employees);
});

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
