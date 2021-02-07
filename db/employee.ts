import { nanoid } from "nanoid";
import { Db } from "mongodb";

export const addEmployee = async (
  db: Db,
  employee: {
    name: string;
    fatherName: string;
    schoolId: string;
    classNumber: number[];
    division: number[];
  }
) => {
  const newEmployee = await db
    .collection("employee")
    .insertOne({
      _id: nanoid(),
      ...employee,
    })
    .then(({ ops }) => ops[0]);
  return newEmployee;
};

export const getEmployeesBySchool = async (db: Db, schoolId: string) => {
  return db.collection("employee").find({ schoolId }).toArray();
};
