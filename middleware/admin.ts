import { user } from "../db";

export default async (req, res, next) => {
  const foundUser = await user.getLogedUser(req.db, req.cookies.auth_token);

  if (!foundUser.isAdmin) {
    return res.status(400).json({ error: "Only admin can access" });
  }
  next();
};
