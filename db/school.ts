import { string } from "yup";
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

export const getTotal = async (db: Db, schoolId: string) => {
  console.log("dsdsd");
  
  const students = await db.collection("students").find({ schoolId }).count();
  const teachers = await db
    .collection("employee")
    .find({ $and: [{ schoolId }, { type: "teacher" }] })
    .count();

  const administrators = await db
    .collection("employee")
    .find({ $and: [{ schoolId }, { type: "administrators" }] })
    .count();
  const services = await db
    .collection("employee")
    .find({ $and: [{ schoolId }, { type: "services" }] })
    .count();
  return { students, teachers, administrators, services };
};
