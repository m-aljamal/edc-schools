import nc from "next-connect";
import dbMissleware from "../../../middleware/db";
import { user } from "../../../db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { google } from "googleapis";

const handler = nc({
  onError,
});

const CLIENT_ID =
  "400572151957-9njm5q4hisod80n2dn14n2alvs91td5k.apps.googleusercontent.com";
const CLIENT_SECRET = "aBbp0g11kE4uYuH98t257Dzb";
const REDIRECT_URI = "http://localhost:3000/api/users/google-callback";

export const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES =
  " https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.install https://www.googleapis.com/auth/drive";

handler.use(dbMissleware);
handler.post(async (req: Request, res: NextApiResponse) => {
  const { email, password } = req.body;

  const logedUser = await user.loginUser(req.db, {
    email,
    password,
  });
  if (!logedUser)
    return res
      .status(400)
      .json({ error: " المستخدم غير مسجل او كلمة السر غير صحيحة" });
  const token = jwt.sign({ id: logedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      path: "/",
    })
  );
  res.send({ data: logedUser });
});

handler.get(async (req: Request, res: NextApiResponse) => {
  let url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.send(url);
});

export default handler;
