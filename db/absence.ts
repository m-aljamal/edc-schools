import { nanoid } from "nanoid";
import { Db } from "mongodb";

export const addAbsences = async (
  db: Db,
  absenceList: {
    name: string;
    fatherName: string;
    schoolId: string;
    classNumber: number;
    division: number;
  }
) => {
  const newAbsence = await db
    .collection("absences")
    .insertOne({
      _id: nanoid(),
      ...absenceList,
    })
    .then(({ ops }) => ops[0]);
  return newAbsence;
};

export const getAbsenceBySchool = async (db: Db, schoolId: string) => {
  return db.collection("absences").find({ schoolId }).toArray();
};
