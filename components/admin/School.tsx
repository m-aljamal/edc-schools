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
const { SubMenu } = Menu;
const School = ({ schoolId }) => {
  console.log(schoolId);

  const [showContent, setShowContent] = useState("");
  const content = {
    teachersList: <NamesList type="teacher" schoolId={schoolId} />,
    mangers: <NamesList type="administrators" schoolId={schoolId} />,
  };

  const handleClick = (e) => {
    setShowContent(e.key);
  };
  console.log(showContent);

  return (
    <>
      <Menu mode="horizontal" onClick={handleClick}>
        <Menu.Item key="teachersList" icon={<LeftOutlined />}>
          المدرسين
        </Menu.Item>
        <Menu.Item key="mangers" icon={<LeftOutlined />}>
          اداريين
        </Menu.Item>
      </Menu>
      <div>{content[showContent]}</div>
    </>
  );
};

export default School;
