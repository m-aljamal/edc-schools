import { NextApiResponse, NextApiRequest } from "next";
import nc from "next-connect";
import onError from "../../../middleware/error";
import formidable from "formidable";
import { googleDrive } from "../../../db";
import fs from "fs";
const handler = nc({
  onError,
});

export const config = {
  api: {
    bodyParser: false,
  },
};
const uploadFile = async (type: string, name: string, path: string, res) => {
  fileCheck(type, res);
  const drive = await googleDrive();
  return await drive.files.create({
    requestBody: {
      name: name,
      mimeType: type,
      driveId: "0AKK2FEcg3f53Uk9PVA",
      parents: ["1xhlyamLDEfXJhFybrYG63CIi7rqNvc2d"],
    },
    media: {
      mimeType: type,
      body: fs.createReadStream(path),
    },
    supportsAllDrives: true,
    supportsTeamDrives: true,
    fields: "id",
  });
};

const fileCheck = (type, res) => {
  const fileType = type.split("/").pop();
  if (fileType !== "pdf") {
    return res.status(400).json({ error: "صيغة الملف غير مدعومة" });
  }
};
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./";
  form.keepExtensions = true;
  form.multiples = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "خطأ بتحميل الملف" });
    }
    // console.log("files.files", files.files.type);
    // console.log(fields.name);

    if (files.files.length) {
      files.files.forEach(async (file) => {
        await uploadFile(file.type, file.name, file.path, res);
      });
      res.json("اكتمل رفع الملف");
    } else {
      await uploadFile(
        files?.files?.type,
        files?.files?.name,
        files?.files?.path,
        res
      );
      res.json("اكتمل رفع الملفات");
    }
  });
});

export default handler;
