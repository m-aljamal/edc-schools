import axios from "axios";
import React from "react";
import useSWR from "swr";
import Dashboard from "../user-pages/Dashboard";
import Home from "../layout/home";
const SingleSchool = ({ schoolId }) => {
  const feacher = (url, schoolId) =>
    axios.get(url, { headers: { schoolId } }).then((res) => res.data);
  const { data, error } = useSWR(
    ["/api/statistics/singleSchool/", schoolId],
    feacher
  );

  if (error) return <p>يوجد خطا في السيرفر الرجاء اعادة المحاولة</p>;
  if (!data) return <p>الرجاء الانتظار.....</p>;

  return <Home totalNumbers={data} schoolId={schoolId} isAdmin={false} />;
};

export default SingleSchool;

{
  /* <Dashboard totalNumbers={data} schoolId={schoolId} isAdmin={false} /> */
}
