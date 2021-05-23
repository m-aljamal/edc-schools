import nc from "next-connect";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
import { oauth2Client } from "./login";

const handler = nc({
  onError,
});

handler.get((req: Request, res: NextApiResponse) => {
  const googleCode = req.query.code.toString();
  if (googleCode) {
    oauth2Client.getToken(googleCode, function (err, token) {
      if (err) {
        console.log("err", err);
      } else {
        console.log("successfuly from google-callback");
        console.log(token);
        
        oauth2Client.setCredentials(token);
      }
    });
  }
  res.redirect("/");
});

export default handler;
