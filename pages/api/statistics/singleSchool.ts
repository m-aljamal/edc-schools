import nc from "next-connect";
import dbMiddleware from "../../../middleware/db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
import { employee } from "../../../db";

import auth from "../../../middleware/auth";
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
                _id: { sex: "$sex" },
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

  res.json({ totalEmployee, totalStudents });
});

export default handler;
