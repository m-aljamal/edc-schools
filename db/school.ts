import { nanoid } from "nanoid";
import { Db } from "mongodb";

export const createSchool = async (
  db: Db,
  school: { name: string; director: string }
) => {
  const newSchool = await db
    .collection("schools")
    .insertOne({
      _id: nanoid(),
      ...school,
    })
    .then(({ ops }) => ops[0]);
  return newSchool;
};

export const getSchools = async (db: Db) => {
  return db.collection("schools").find({}).toArray();
};

export const getSchoolById = async (db: Db, id: string) => {
  return db.collection("schools").findOne({ _id: id });
};

export const getSchoolByDirector = async (db: Db, directorId: string) => {
  return db.collection("schools").findOne({ director: directorId });
};
