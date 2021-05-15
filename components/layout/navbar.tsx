import UserDropdown from "./userDropdown";

export default function Navbar({ currentUser, userSchool }) {
  return (
    <>
      <nav className=" md:bg-pink-600 md:shadow-lg  top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="  w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <p className="text-white  md:text-xl uppercase hidden md:inline-block font-semibold">
            {userSchool.name}
          </p>

          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown currentUser={currentUser} />
          </ul>
        </div>
      </nav>
    </>
  );
}
