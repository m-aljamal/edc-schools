import { NextApiResponse, NextApiRequest } from "next";
import nc from "next-connect";
import onError from "../../../middleware/error";
import formidable from "formidable";
import { googleDrive } from "../../../db";
import fs from "fs";
import { createFile } from "../names/[type]";
import { auth } from "../../../middleware";
import dbMiddleware from "../../../middleware/db";

const handler = nc({
  onError,
});
handler.use(dbMiddleware);
handler.use(auth);
export const config = {
  api: {
    bodyParser: false,
  },
};
const uploadFile = async (
  type: string,
  name: string,
  path: string,
  res,
  folderName: string,
  folderId: string,
  req
) => {
  // const check = fileCheck(type, res);
  // if (check === "error") {
  //   return res.status(400).json({ error: "صيغة الملف غير مدعومة" });
  // } else {
  const drive = await googleDrive();

  let newFolderId;
  if (folderId === "new") {
    const name = "name =" + '"' + req.user.name + '"';
    const id = await drive.files.list({
      q: name,
      includeItemsFromAllDrives: true,
      driveId: "0AKK2FEcg3f53Uk9PVA",
      supportsAllDrives: true,
      corpora: "drive",
    });

    const fileMetadata = {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      driveId: "0AKK2FEcg3f53Uk9PVA",
      parents: [id.data?.files[0]?.id],
    };
    const file = await drive.files.create({
      requestBody: fileMetadata,
      supportsAllDrives: true,
    });
    newFolderId = file.data.id;
  }

  const responce = await drive.files.create({
    requestBody: {
      name: name,
      mimeType: type,
      driveId: "0AKK2FEcg3f53Uk9PVA",
      parents: [folderId !== "new" ? folderId : newFolderId],
    },
    media: {
      mimeType: type,
      body: fs.createReadStream(path),
    },
    supportsAllDrives: true,
    supportsTeamDrives: true,
    fields: "id",
  });
  console.log(responce);
  return responce;
};

const fileCheck = (type, res) => {
  const fileType = type.split("/").pop();
  if (fileType !== "pdf") {
    return "error";
  }
};
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  // form.uploadDir = "./";
  // form.keepExtensions = true;
  form.multiples = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: "خطأ بتحميل الملف" });
    }
    if (!fields.name) {
      return res.status(400).json({ error: "الرجاء اختيار المجلد" });
    }
    if (files?.files?.length) {
      files.files.forEach(async (file) => {
        await uploadFile(
          file.type,
          file.name,
          file.path,
          res,
          fields.name,
          fields.folderId,
          req
        );
      });
    } else {
      await uploadFile(
        files?.files?.type,
        files?.files?.name,
        files?.files?.path,
        res,
        fields.name,
        fields.folderId,
        req
      );
    }
    res.json("اكتمل رفع الملفات");
  });
});

export default handler;
