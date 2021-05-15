import dynamic from "next/dynamic";
const NamesList = dynamic(() => import("../views/NamesList"));
const AddAbcence = dynamic(() => import("../views/AddAbcence"));
const AbcenceMonthPreview = dynamic(
  () => import("../views/AbcenceMonthPreview")
);
import SingleSchool from "../statistics/SingleSchool";
import Home from "./home";
const ContentMenu = ({ schoolId, showContent }) => {
  const menuContent = {
    home: <SingleSchool schoolId={schoolId} />,
    // home: <SingleSchool schoolId={schoolId} />,
    teachers: <NamesList type="teacher" schoolId={schoolId} />,
    administrators: <NamesList type="administrators" schoolId={schoolId} />,
    services: <NamesList type="services" schoolId={schoolId} />,
    monthlyEmployeesTimeSheet: (
      <AbcenceMonthPreview schoolId={schoolId} type="employees" />
    ),
    monthlyStudentTimeSheet: (
      <AbcenceMonthPreview schoolId={schoolId} type="students" />
    ),
    employeesTimeSheet: <AddAbcence type="employees" />,

    students: <NamesList type="students" schoolId={schoolId} />,
    stutimesheet: <AddAbcence type="students" />,
  };
  return <div>{menuContent[showContent]}</div>;
};

export default ContentMenu;
