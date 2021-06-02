import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./slideBar";
import ContentMenu from "./ContentMenu";
import AdminContentMenu from "./adminContentMenu";
export default function Dashboard({ currentUser, userSchool, schools }) {
  const [currentContnet, setCurrentContent] = useState("home");
  const [schoolId, setSchoolId] = useState(null);

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
        {currentUser?.isAdmin ? (
          <AdminContentMenu showContent={currentContnet} schoolId={schoolId} />
        ) : (
          <ContentMenu schoolId={null} showContent={currentContnet} />
        )}
      </div>
    </>
  );
}
