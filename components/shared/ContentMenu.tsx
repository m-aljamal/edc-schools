import dynamic from "next/dynamic";
const NamesList = dynamic(() => import("../user-pages/NamesList"));
const TimeSheet = dynamic(() => import("../abcence/TimeSheet"));

const ContentMenu = ({ schoolId, showContent, isAdmin }) => {
  const menuContent = {
    home: <div>Home</div>,
    teachers: <NamesList type="teacher" schoolId={schoolId} />,
    administrators: <NamesList type="administrators" schoolId={schoolId} />,
    services: <NamesList type="services" schoolId={schoolId} />,
    employees: (
      <TimeSheet type="employees" isAdmin={isAdmin} schoolId={schoolId} />
    ),
    students: <NamesList type="students" schoolId={schoolId} />,
    stutimesheet: (
      <TimeSheet type="students" isAdmin={isAdmin} schoolId={schoolId} />
    ),
  };
  return <div>{menuContent[showContent]}</div>;
};

export default ContentMenu;
