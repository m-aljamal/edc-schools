import React, { useState } from "react";
import DashbordLayout from "../../components/shared/DashbordLayout";
import { connectToDB, school, user } from "../../db";
import NamesList from "../../components/user-pages/NamesList";
import TimeSheet from "../../components/abcence/TimeSheet";
import MenuList from "../../components/shared/MenuList";
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
import SubMenu from "antd/lib/menu/SubMenu";
import School from "../../components/admin/School";
const UserDashboard = ({ currentUser, schools }) => {
  const [currentContnet, setCurrentContent] = useState("home");
  const [schoolId, setSchoolId] = useState(null);
  const menuContent = {
    home: <div>Home</div>,
    allSchools: <School schoolId={schoolId} />,
  };
  const handleClick = (e) => {
    if (e.keyPath.length === 2) {
      setSchoolId(e.keyPath[0]);
      setCurrentContent(e.keyPath[1]);
    } else {
      setCurrentContent(e.key);
    }
  };

  return (
    <DashbordLayout
      currentUser={currentUser}
      userSchool={{ name: "حساب المشرف العام" }}
      pageContent={menuContent[currentContnet]}
      menuData={
        <Menu
          onClick={handleClick}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          className="userMenu"
        >
          <Menu.Item key="home" icon={<FundOutlined />}>
            الرئيسية
          </Menu.Item>

          <SubMenu key="allSchools" icon={<TeamOutlined />} title="المدارس">
            {schools?.map((s, i) => (
              <Menu.Item key={s._id} icon={<LeftOutlined />}>
                {s.name}
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      }
    />
  );
};

export default UserDashboard;

export async function getServerSideProps(ctx) {
  const { db } = await connectToDB();

  const props: any = {};

  if (ctx.req.cookies.auth_token) {
    props.currentUser = await user.getLogedUser(db, ctx.req.cookies.auth_token);
    if (!props.currentUser.isAdmin) {
      ctx.res.writeHead(302, { Location: "/user-dashboard" });
      ctx.res.end();
    }
  } else {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
  }
  props.schools = await school.getSchools(db);

  //   props.userSchool = await school.getSchoolByDirector(
  //     db,
  //     props.currentUser._id
  //   );

  return {
    props,
  };
}
