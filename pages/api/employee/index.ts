import nc from "next-connect";
import dbMiddleware from "../../../middleware/db";
import onError from "../../../middleware/error";
import { RequestStudnet } from "../../../types";
import { NextApiResponse } from "next";
import auth from "../../../middleware/auth";
const handler = nc({
  onError,
});
handler.use(dbMiddleware);
// handler.use(auth);
handler.get(async (req: RequestStudnet, res: NextApiResponse) => {
  let employees = await req.db.collection("employee").find({});

  res.send({ data: employees });
});
export default handler;
