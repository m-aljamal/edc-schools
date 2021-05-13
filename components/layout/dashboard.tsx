import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./slideBar";
import ContentMenu from "./ContentMenu";
export default function Dashboard({ currentUser, userSchool }) {
  const [currentContnet, setCurrentContent] = useState("home");

  return (
    <>
      <Sidebar
        currentContnet={currentContnet}
        setCurrentContent={setCurrentContent}
        currentUser={currentUser}
      />
      <div className="relative md:mr-80 bg-blueGray-100">
        <Navbar currentUser={currentUser} userSchool={userSchool} />
        <ContentMenu
          schoolId={null}
          showContent={currentContnet}
          isAdmin={false}
        />
      </div>
    </>
  );
}
