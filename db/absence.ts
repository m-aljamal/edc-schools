import { nanoid } from "nanoid";
import { Db } from "mongodb";

export const addAbsences = async (
  db: Db,
  absenceList: {
    schoolId: string;
    date: string;
    reason: string;
    absenceIds: [];
  }
) => {
  const absenceUsers = await db
    .collection("employee")
    .find({ _id: { $in: absenceList.absenceIds } })
    .project({ name: 1 })
    .toArray();

  const newAbsence = await db
    .collection("absences")
    .insertOne({
      _id: nanoid(),
      emplpyees: absenceUsers,
      date: absenceList.date,
      reason: absenceList.reason,
      schoolId: absenceList.schoolId,
    })
    .then(({ ops }) => ops[0]);

  return [];
};

export const getAbsenceBySchool = async (db: Db, schoolId: string) => {
  return db.collection("absences").find({ schoolId }).toArray();
};

export const getAbsenceBySchoolAndDate = async (
  db: Db,
  schoolId: string,
  date: string
) => {
  const findAbsences = await db
    .collection("absences")
    .findOne({ $and: [{ schoolId }, { date: { $eq: date } }] });

  return findAbsences;
};
