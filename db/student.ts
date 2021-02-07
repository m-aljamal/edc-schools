import { nanoid } from "nanoid";
import { Db } from "mongodb";

export const addStudent = async (
  db: Db,
  student: {
    name: string;
    fatherName: string;
    schoolId: string;
    classNumber: number;
    division: number;
  }
) => {
  const newStudent = await db
    .collection("students")
    .insertOne({
      _id: nanoid(),
      ...student,
    })
    .then(({ ops }) => ops[0]);
  return newStudent;
};

export const getStudentsBySchool = async (db: Db, schoolId: string) => {
  return db.collection("students").find({ schoolId }).toArray();
};
