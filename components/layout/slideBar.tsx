import { useState } from "react";
import Link from "next/link";
import AdminMenuList from "./adminMenuList";
import UserDropdown from "./userDropdown";
import MenuList from "./MenuList";
import TeacherMenuList from "./TeacherMenuList";
export default function Sidebar({
  setCurrentContent,
  currentContnet,
  currentUser,
  schools,
  setSchoolId,
}) {
  const [collapseShow, setCollapseShow] = useState("hidden");

  const handleClick = (e) => {
    if (currentUser.isAdmin) {
      if (e.keyPath.length === 2) {
        setSchoolId(e.keyPath[0]);
        setCurrentContent(e.keyPath[1]);
      } else {
        setCurrentContent(e.key);
      }
    } else {
      setCurrentContent(e.key);
    }
  };
  const showMenuList = () => {
    if (currentUser?.type === "teacher") {
      return (
        <TeacherMenuList
          selectedKeys={currentContnet}
          handleClick={handleClick}
          theme="light"
          mode="inline"
          className=""
        />
      );
    }
    if (currentUser?.isAdmin) {
      return (
        <AdminMenuList
          schools={schools}
          selectedKeys={currentContnet}
          handleClick={handleClick}
          theme="light"
          mode="inline"
          className=""
        />
      );
    }
    if (!currentUser?.isAdmin) {
      return (
        <MenuList
          selectedKeys={currentContnet}
          handleClick={handleClick}
          theme="light"
          mode="inline"
          className=""
        />
      );
    }
  };

  return (
    <>
      <nav className="bg-pink-600 md:bg-white shadow-lg  md:right-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-72 z-10 py-4 px-2">
        <div className="  md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-11/12 mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6 ")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/">
            <a className="md:block text-white md:text-black text-center md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-base md:text-xl uppercase font-bold p-4 px-0">
              {currentUser?.name} - EDC
            </a>
          </Link>
          {/* User */}
          <div className="md:hidden   ">
            <UserDropdown currentUser={currentUser} />
          </div>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="w-6/12 flex justify-end">
                <button
                  type="button"
                  className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            {/* {currentUser?.isAdmin ? (
              <AdminMenuList
                schools={schools}
                selectedKeys={currentContnet}
                handleClick={handleClick}
                theme="light"
                mode="inline"
                className=""
              />
            ) : (
              <MenuList
                selectedKeys={currentContnet}
                handleClick={handleClick}
                theme="light"
                mode="inline"
                className=""
              />
            )} */}
            {showMenuList()}
          </div>
        </div>
      </nav>
    </>
  );
}
