import nc from "next-connect";
import dbMiddleware from "../../../../middleware/db";
import onError from "../../../../middleware/error";
import { Request } from "../../../../types";
import { NextApiResponse } from "next";
import auth from "../../../../middleware/auth";
import { databaseCollections } from "../../../../static/databaseCollections";
import { nanoid } from "nanoid";

const handler = nc({
  onError,
});
handler.use(dbMiddleware);
handler.use(auth);
handler.get(async (req: Request, res: NextApiResponse) => {
  const collection = databaseCollections[req.query.type.toString()].names;
  let employees;
  req.query.type === "employees"
    ? (employees = await req.db
        .collection(collection)
        .find({
          schoolId: req.userSchool,
        })
        .toArray())
    : (employees = await req.db
        .collection(collection)
        .find({
          $and: [{ schoolId: req.userSchool }, { type: req.query.type }],
        })
        .toArray());

  res.json(employees);
});

handler.post(async (req: Request, res: NextApiResponse) => {
  const collection = databaseCollections[req.query.type.toString()].names;

  let newEmployee = await req.db
    .collection(collection)
    .findOne({ name: req.body.name });
  if (newEmployee) return res.status(400).json({ error: "الاسم مسجل  مسبقا" });

  newEmployee = await req.db
    .collection(collection)
    .insertOne({
      _id: nanoid(),
      ...req.body,
      schoolId: req.userSchool,
    })
    .then(({ ops }) => ops[0]);

  res.send({ data: newEmployee });
});

export default handler;
