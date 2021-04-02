import { Menu } from "antd";
import {
  TeamOutlined,
  FundOutlined,
  BarcodeOutlined,
  BookOutlined,
  CalculatorOutlined,
  FileDoneOutlined,
  SmileOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import NamesList from "../user-pages/NamesList";
import { useState } from "react";
import MenuList from "../shared/MenuList";
import TimeSheet from "../../components/abcence/TimeSheet";

const { SubMenu } = Menu;
const School = ({ schoolId }) => {
  console.log(schoolId);

  const [showContent, setShowContent] = useState("");
  const menuContent = {
    home: <div>Home</div>,
    teachers: <NamesList type="teacher" schoolId={schoolId} />,
    administrators: <NamesList type="administrators" schoolId={schoolId} />,
    services: <NamesList type="services" schoolId={schoolId} />,
    employees: <TimeSheet type="employees" />,
    students: <NamesList type="students" schoolId={schoolId} />,
    stutimesheet: <TimeSheet type="students" />,
  };

  const handleClick = (e) => {
    setShowContent(e.key);
  };
  console.log(showContent);

  return (
    <>
      {/* <Menu mode="horizontal" onClick={handleClick}>
        <Menu.Item key="teachersList" icon={<LeftOutlined />}>
          المدرسين
        </Menu.Item>
        <Menu.Item key="mangers" icon={<LeftOutlined />}>
          اداريين
        </Menu.Item>
      </Menu> */}
      <MenuList
        handleClick={handleClick}
        theme="light"
        mode="horizontal"
        className="adminMenu"
      />
      <div>{menuContent[showContent]}</div>
    </>
  );
};

export default School;
