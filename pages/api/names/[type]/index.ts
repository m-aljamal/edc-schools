import nc from "next-connect";
import dbMiddleware from "../../../../middleware/db";
import onError from "../../../../middleware/error";
import { Request } from "../../../../types";
import { NextApiResponse } from "next";
import auth from "../../../../middleware/auth";
import { databaseCollections } from "../../../../static/databaseCollections";
import { nanoid } from "nanoid";
import { googleDrive } from "../../../../db";

const handler = nc({
  onError,
});

export const createFile = async (name: string, id: string) => {
  const fileMetadata = {
    name,
    mimeType: "application/vnd.google-apps.folder",
    driveId: "0AKK2FEcg3f53Uk9PVA",
    parents: [id],
  };
  const drive = await googleDrive();
  const file = await drive.files.create({
    requestBody: fileMetadata,
    supportsAllDrives: true,
  });
  return file;
};

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

  let newEmployee = await req.db.collection(collection).findOne({
    name: req.body.name,
    fatherName: req.body.fatherName,
    motherName: req.body.motherName,
    schoolId: req.userSchool,
  });
  if (newEmployee) return res.status(400).json({ error: "الاسم مسجل  مسبقا" });

  let user = await req.db
    .collection("users")
    .findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ error: "الايميل مستخدم لشخص اخر" });
  }
  if (req.body.type === "teacher") {
    const school = await req.db
      .collection("schools")
      .findOne({ _id: req.userSchool });
    const file = await createFile(req.body.name, school.driveFileId);

    if (file.status !== 200) {
      return res.status(400).json({ error: "مشكلة في انشاء ملفات المدرس" });
    }
    if (file?.data?.id) {
      ["تحضير الدروس", "ملف الدوام", "الغياب"].forEach(async (name) => {
        await createFile(name, file.data.id);
      });
    }
  }
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
