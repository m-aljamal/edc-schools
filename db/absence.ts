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
export const getAbsenceBySchoolAndDate = async (
  db: Db,
  schoolId: string,
  date: string
) => {
  const findAbsences = await db
    .collection("absences")
    .findOne({ $and: [{ schoolId }, { date: { $eq: date } }] });

  if (!findAbsences) return null;

  const users = await db
    .collection("employee")
    .find({ _id: { $in: findAbsences.absenceIds } })
    .project({ name: 1 })
    .toArray();

  return { users, findAbsences };
};

export const absenceMonthPreview = async (db: Db, schoolId: string) => {
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);

  const currentMonthTimeSheet = await db
    .collection("absences")
    .find({
      $and: [
        { date: { $gte: firstDay.toISOString() } },
        { date: { $lt: lastDay.toISOString() } },
      ],
    })
    .toArray();

  const usersIds = currentMonthTimeSheet
    .map((user) => [...user.absenceIds])
    .flat();

  const users = await db
    .collection("employee")
    .find({ _id: { $in: usersIds } })
    .project({ name: 1 })
    .toArray();
  console.log("users", users);

  return { currentMonthTimeSheet };
};
