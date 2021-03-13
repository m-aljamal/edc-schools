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

export const absenceMonthPreview = async (
  db: Db,
  schoolId: string,
  month: number
) => {
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();

  const firstDay = month ? new Date(y, m - 1, 0) : new Date(y, m, 1);
  const lastDay = month ? new Date(y, m, 1) : new Date(y, m + 1, 0);
  // console.log({ firstDay, lastDay });

  const currentMonthTimeSheet = await db
    .collection("absences")
    .find({
      schoolId: schoolId,
      $and: [
        { date: { $gte: firstDay.toISOString() } },
        { date: { $lte: lastDay.toISOString() } },
      ],
    })
    .toArray();
console.log(currentMonthTimeSheet);
console.log(currentMonthTimeSheet.length);

  return currentMonthTimeSheet;
};
