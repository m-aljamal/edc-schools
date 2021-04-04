import useSWR from "swr";
import Dashboard from "../user-pages/Dashboard";

export const AllSchools = () => {
  const { data, error } = useSWR("/api/statistics/allSchools/");
  if (error) return <p>يوجد خطا في السيرفر الرجاء اعادة المحاولة</p>;
  if (!data) return <p>الرجاء الانتظار.....</p>;

  // if (req.headers.isadmin) {
  //   abcence = await req.db
  //     .collection("absences")
  //     .aggregate([
  //       {
  //         $match: {
  //           date: { $eq: setDate(req.query.date.toString()) },
  //         },
  //       },
  //       {
  //         $unwind: "$names",
  //       },
  //       { $project: { names: 1 } },
  //     ])
  //     .toArray();

  //   return res.status(200).json(abcence.length);
  // }

  return <Dashboard totalNumbers={data} schoolId={null} isAdmin={true} />;
};
