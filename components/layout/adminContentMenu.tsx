import Home from "./home";
import School from "./School";

export default function adminContentMenu({ showContent, schoolId }) {
  const menuContent = {
    home: <Home />,
    schoolsUsers: <p>schoolsUsers</p>,
    allSchools: <School schoolId={schoolId} />,
    // allSchools: <School schoolId={schoolId} />,
  };
  return <div>{menuContent[showContent]}</div>;
}
