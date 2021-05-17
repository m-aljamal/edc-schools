import Home from "../views/SingleSchoolStatistics";
import School from "./School";
import {AllSchools} from "../statistics/AllSchools";
export default function adminContentMenu({ showContent, schoolId }) {
  const menuContent = {
    home: <AllSchools />,
    schoolsUsers: <p>schoolsUsers</p>,
    allSchools: <School schoolId={schoolId} />,
    // allSchools: <School schoolId={schoolId} />,
  };
  return <div>{menuContent[showContent]}</div>;
}
