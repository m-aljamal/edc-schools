import nc from "next-connect";
import dbMissleware from "../../../middleware/db";
import { user } from "../../../db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse,NextApiRequest } from "next";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import {connect} from '../../../utils/database'
const handler = nc({
  onError,
});
handler.get(async (req:NextApiRequest, res:NextApiResponse)=>{
  const {db}  = await connect()
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(req.headers.auth_token);

  // let currentUser = await db
  res.send('test')
})
// export const getLogedUser = async (db: Db, token) => {
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   return db.collection("users").findOne({ _id: decoded.id });
// };

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
export default handler;
 