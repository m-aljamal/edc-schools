import useSWR from "swr";
import Dashboard from "../user-pages/Dashboard";
import AllSchoolStatistics from "./AllSchoolStatistics";
import SingleSchoolStatistics from "./SingleSchoolStatistics";
export const AllSchools = () => {
  const { data, error } = useSWR("/api/statistics/allSchools/");
  if (error) return <p>يوجد خطا في السيرفر الرجاء اعادة المحاولة</p>;
  if (!data) return <p>الرجاء الانتظار.....</p>;
  console.log(data);
  const employees = data?.totalEmployee[0];
  const students = data?.totalStudents[0];
  return <SingleSchoolStatistics employees={employees} students={students} />;
};
