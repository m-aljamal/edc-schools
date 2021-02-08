import { nanoid } from "nanoid";
import { Db } from "mongodb";
import jwt from "jsonwebtoken";

export const createUser = async (
  db: Db,
  user: { name: string; email: string; password: string; isAdmin: boolean }
) => {
  const newUser = await db
    .collection("users")
    .insertOne({
      _id: nanoid(),
      ...user,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0]);

  return newUser;
};
export const getUsers = async (db: Db) => {
  return db.collection("users").find({}).toArray();
};

export const getUser = async (db: Db, id: string) => {
  return db.collection("users").findOne({ _id: id });
};

export const loginUser = async (
  db: Db,
  user: { email: string; password: string }
) => {
  return await db
    .collection("users")
    .findOne({ email: user.email, password: user.password });
};

export const getLogedUser = async (db: Db, token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return db.collection("users").findOne({ _id: decoded.id });
};