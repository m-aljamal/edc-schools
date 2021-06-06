import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./slideBar";
import ContentMenu from "./ContentMenu";
import AdminContentMenu from "./adminContentMenu";
import TeacherContentMenu from "./TeacherContentMenu";
export default function Dashboard({ currentUser, userSchool, schools }) {
  const [currentContnet, setCurrentContent] = useState("home");
  const [schoolId, setSchoolId] = useState(null);

  const showContentMenu = () => {
    if (currentUser?.type === "teacher") {
      return (
        <TeacherContentMenu schoolId={null} showContent={currentContnet} />
      );
    }

    if (currentUser?.isAdmin) {
      return (
        <AdminContentMenu showContent={currentContnet} schoolId={schoolId} />
      );
    }
    if (!currentUser?.isAdmin) {
      return <ContentMenu schoolId={null} showContent={currentContnet} />;
    }
  };

  return (
    <>
      <Sidebar
        currentContnet={currentContnet}
        setCurrentContent={setCurrentContent}
        currentUser={currentUser}
        schools={schools}
        setSchoolId={setSchoolId}
      />
      <div className="relative md:mr-72 bg-blueGray-100">
        <Navbar currentUser={currentUser} userSchool={userSchool} />
        {showContentMenu()}
      </div>
    </>
  );
}
