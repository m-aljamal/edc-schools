import nc from "next-connect";
import dbMiddleware from "../../../middleware/db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
import auth from "../../../middleware/auth";
import setDate from "../../../utils/setDate";
import { findRemainigDayes } from "../../../utils/findRemainigDayes";
const handler = nc({
  onError,
});
handler.use(dbMiddleware);
handler.use(auth);
handler.get(async (req: Request, res: NextApiResponse) => {
  const totalEmployee = await req.db
    .collection("employee")
    .aggregate([
      {
        $facet: {
          employeeType: [
            {
              $match: {
                schoolId: req.userSchool,
              },
            },
            {
              $group: {
                _id: { type: "$type" },
                total: { $sum: 1 },
              },
            },

            { $sort: { total: -1 } },
          ],
          totalEmployee: [
            {
              $match: {
                schoolId: req.userSchool,
              },
            },
            {
              $count: "totalEmployee",
            },
          ],
          gender: [
            {
              $match: { schoolId: req.userSchool },
            },
            {
              $group: {
                _id: { sex: "$sex", type: "$type" },
                total: { $sum: 1 },
              },
            },

            { $sort: { total: -1 } },
          ],
          typeOfCertifcate: [
            {
              $match: { schoolId: req.userSchool },
            },
            {
              $group: {
                _id: { TypeOfCertifcate: "$TypeOfCertifcate" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          jobTitle: [
            {
              $match: { schoolId: req.userSchool, type: { $ne: "teacher" } },
            },
            {
              $group: {
                _id: { jobTitle: "$jobTitle" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: 1 } },
          ],
          subject: [
            {
              $match: { schoolId: req.userSchool, type: "teacher" },
            },
            { $project: { subject: 1 } },
            { $unwind: "$subject" },
            {
              $group: {
                _id: { subject: "$subject" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          division: [
            {
              $match: { schoolId: req.userSchool, type: "teacher" },
            },
            { $project: { division: 1, classNumber: 1 } },
            { $unwind: "$division" },
            { $unwind: "$classNumber" },
            {
              $group: {
                _id: { classNumber: "$classNumber", division: "$division" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          classNumber: [
            {
              $match: { schoolId: req.userSchool, type: "teacher" },
            },
            { $project: { classNumber: 1 } },
            { $unwind: "$classNumber" },
            {
              $group: {
                _id: { classNumber: "$classNumber" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],

          typeOfDegree: [
            {
              $match: { schoolId: req.userSchool, type: { $ne: "services" } },
            },
            {
              $group: {
                _id: { typeOfDegree: "$typeOfDegree" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
        },
      },
    ])
    .toArray();

  const totalStudents = await req.db
    .collection("students")
    .aggregate([
      {
        $facet: {
          gender: [
            {
              $match: { schoolId: req.userSchool },
            },
            {
              $group: {
                _id: { sex: "$sex" },
                total: { $sum: 1 },
              },
            },

            { $sort: { total: -1 } },
          ],
          totalStudents: [
            {
              $match: { schoolId: req.userSchool },
            },
            {
              $count: "totalStudents",
            },
          ],
          familySituation: [
            {
              $match: { schoolId: req.userSchool },
            },
            {
              $group: {
                _id: { familySituation: "$familySituation" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          classNumber: [
            {
              $match: { schoolId: req.userSchool },
            },
            {
              $group: {
                _id: { classNumber: "$classNumber" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          division: [
            {
              $match: { schoolId: req.userSchool },
            },
            { $project: { division: 1, classNumber: 1 } },

            {
              $group: {
                _id: { classNumber: "$classNumber", division: "$division" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          healthSituation: [
            {
              $match: { schoolId: req.userSchool },
            },
            {
              $group: {
                _id: { healthSituation: "$healthSituation" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
        },
      },
    ])
    .toArray();

  const empAbcenseByYear = await req.db
    .collection("absences")
    .aggregate([
      {
        $facet: {
          absenceOfYear: [
            {
              $match: {
                schoolId: req.userSchool,
                $and: [
                  { date: { $gte: new Date(new Date().getFullYear(), 0, 1) } },
                  {
                    date: { $lte: new Date(new Date().getFullYear(), 11, 31) },
                  },
                ],
              },
            },
            { $unwind: "$names" },
            {
              $group: {
                _id: { name: "$names.name" },
                total: { $sum: 1 },
              },
            },

            { $sort: { total: -1 } },
          ],
          absenceByReason: [
            {
              $match: {
                schoolId: req.userSchool,
                $and: [
                  { date: { $gte: new Date(new Date().getFullYear(), 0, 1) } },
                  {
                    date: { $lte: new Date(new Date().getFullYear(), 11, 31) },
                  },
                ],
              },
            },
            { $unwind: "$names" },
            {
              $group: {
                _id: { name: "$names.reason" },
                total: { $sum: 1 },
              },
            },

            { $sort: { total: -1 } },
          ],
          absenceByNameAndReson: [
            {
              $match: {
                schoolId: req.userSchool,
                $and: [
                  { date: { $gte: new Date(new Date().getFullYear(), 0, 1) } },
                  {
                    date: { $lte: new Date(new Date().getFullYear(), 11, 31) },
                  },
                ],
              },
            },
            { $unwind: "$names" },
            {
              $group: {
                _id: { name: "$names.name", reason: "$names.reason" },
                total: { $sum: 1 },
              },
            },

            { $sort: { total: -1 } },
          ],
          totalEmployeeAbsence: [
            {
              $match: {
                schoolId: req.userSchool,
                $and: [
                  { date: { $gte: new Date(new Date().getFullYear(), 0, 1) } },
                  {
                    date: { $lte: new Date(new Date().getFullYear(), 11, 31) },
                  },
                ],
              },
            },
            { $unwind: "$names" },
            {
              $count: "totalAbsence",
            },
          ],
        },
      },
    ])
    .toArray();

  const schoolDate = await req.db.collection("schools").findOne({
    _id: req.userSchool,
  });
  const date = setDate(new Date());

  let remaningDayes;
  let dateStart;
  let dateEnd;
  const firstStart = setDate(schoolDate.firstTermSchoolDateStart);
  const firstEnd = setDate(schoolDate.firstTermSchoolDateEnd);
  const secoundStart = setDate(schoolDate.secoundTermSchoolDateStart);
  const secoundEnd = setDate(schoolDate.secoundTermSchoolDateEnd);

  if (date <= firstEnd && date >= firstStart) {
    remaningDayes = findRemainigDayes(date, firstEnd);
    dateStart = firstStart;
    dateEnd = firstEnd;
  }
  if (date < secoundStart && date > firstEnd) {
    remaningDayes = findRemainigDayes(date, secoundStart);
    dateStart = secoundStart;
  }
  if (date >= firstEnd && date <= secoundEnd && date >= secoundStart) {
    remaningDayes = findRemainigDayes(date, secoundEnd);
    dateStart = secoundStart;
    dateEnd = secoundEnd;
  }

  res.json({
    totalEmployee,
    totalStudents,
    empAbcenseByYear,
    dates: {
      remaningDayes,
      dateStart,
      dateEnd,
    },
  });
});

export default handler;
// {
//   _id: 'wdABH1vIrJLLbqriq5hqA',
//   name: 'مدرسة الإمام الشافعي ذكور',
//   director: '0rd8IUZKZZlWv9nEvELda',
//   driveFileId: '1FD17i1MS6S9w5myVs-nlMZ9gNgRgO8IK',
//   firstTermSchoolDateStart: '2021-01-27T17:45:47.489Z',
//   firstTermSchoolDateEnd: '2021-07-04T17:45:51.628Z',
//   secoundTermSchoolDateStart: '2021-08-07T17:45:55.563Z',
//   secoundTermSchoolDateEnd: '2021-10-28T17:46:00.309Z'
// }
