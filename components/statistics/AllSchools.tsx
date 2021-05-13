import useSWR from "swr";
import Dashboard from "../user-pages/Dashboard";

export const AllSchools = () => {
  const { data, error } = useSWR("/api/statistics/allSchools/");
  if (error) return <p>يوجد خطا في السيرفر الرجاء اعادة المحاولة</p>;
  if (!data) return <p>الرجاء الانتظار.....</p>;

   
  return <Dashboard totalNumbers={data} schoolId={null} isAdmin={true} />;
};
