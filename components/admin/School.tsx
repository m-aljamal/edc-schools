import { useEffect, useState } from "react";
import MenuList from "../shared/MenuList";
import ContentMenu from "../shared/ContentMenu";

const School = ({ schoolId }) => {
  const [showContent, setShowContent] = useState("home");

  useEffect(() => {
    setShowContent("home");
  }, [schoolId]);

  const handleClick = (e) => {
    setShowContent(e.key);
  };

  return (
    <>
      <MenuList
        handleClick={handleClick}
        theme="light"
        mode="horizontal"
        className="adminMenu"
        selectedKeys={showContent}
      />
      <div className="mt-2">
        <ContentMenu
          schoolId={schoolId}
          showContent={showContent}
          isAdmin={true}
        />
      </div>
    </>
  );
};

export default School;
